import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const FormData = await req.formData();
    const user = await currentUser();
    const recordId = FormData.get("recordId");
    const resumeFile: any = FormData.get("resumeFile");

    if (!resumeFile) {
      return NextResponse.json({ error: "No resume file found" }, { status: 400 });
    }

    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();

    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Send event to Inngest
    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId,
        base64ResumeFile: base64,
        pdfText: docs[0]?.pageContent,
        aiAgentType: "/ai-tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const runId = resultIds?.ids?.[0];
    if (!runId) {
      return NextResponse.json({ error: "Failed to create Inngest run" }, { status: 500 });
    }

    // Poll for completion
    let runStatus;
    while (true) {
      runStatus = await getRuns(runId);

      if (runStatus?.data?.[0]?.status === "Completed") break;
      if (runStatus?.data?.[0]?.status === "Cancelled") {
        return NextResponse.json({ error: "Inngest run was cancelled" }, { status: 500 });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const output =
      runStatus?.data?.[0]?.output?.output?.[0] ||
      runStatus?.data?.[0]?.output?.[0] ||
      runStatus?.data?.[0]?.output;

    console.log("✅ Extracted output:", output);

    if (!output) {
      return NextResponse.json(
        { error: "No output received from Inngest run" },
        { status: 500 }
      );
    }

    // Return safely — no need for JSON.parse(JSON.stringify(...))
    return NextResponse.json(output);
  } catch (error: any) {;
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function getRuns(runId: string) {
  const result = await axios.get(
    `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
    {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    }
  );

  return result.data;
}
