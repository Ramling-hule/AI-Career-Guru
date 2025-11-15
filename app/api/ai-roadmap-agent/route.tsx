import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    try {
    const {roadmapId, userInput} = await req.json();
    const user = await currentUser();

    const resultIds = await inngest.send({
    name:'AiRoadmapAgent',
    data: {
        userInput : userInput,
        roadmapId: roadmapId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        aiAgentType: '/ai-tools/ai-roadmap-agent',
    }
  })

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