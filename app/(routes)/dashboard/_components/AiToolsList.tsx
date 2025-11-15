import React from "react";
import AiToolCard from "./AiToolCard";

export const aiToolsList = [
  {
    name: "AI Career Q&A Chat",
    desc: "Ask career questions",
    icon: "/chatbot.png",
    button: "Ask Now",
    path: "/ai-tools/ai-chat",
  },
  {
    name: "AI Resume Analyzer",
    desc: "Improve your resume",
    icon: "/resume.png",
    button: "Analyze Now",
    path: "/ai-tools/ai-resume-analyzer",
  },
  {
    name: "Career Roadmap Generator",
    desc: "Build your roadmap",
    icon: "/roadmap.png",
    button: "Generate Now",
    path: "/ai-tools/ai-roadmap-agent",
  },
  {
    name: "Cover Letter Generator",
    desc: "Write a cover letter",
    icon: "/cover.png",
    button: "Create Now",
    path: "/ai-cover-letter-generator",
  },
];

function AiToolsList() {
  return (
    <div className="mt-7 p-3 border rounded-xl">
      <h2 className="font-bold">Available AI Tools</h2>
      <p>Start Building and shape Your Career with this exclusive AI Tools.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cold-4 gap-5 mt-4 ">
        {aiToolsList.map((tool: any, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AiToolsList;
