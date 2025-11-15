"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { Send } from "lucide-react";
import EmptyState from "../_components/EmptyState";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type messages = {
  content: string;
  role: string;
  type: string;
};

function page() {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState<messages[]>([]);
  const { chatid }: any = useParams();

  const router = useRouter();

  useEffect(() => {
    chatid && GetMessageList();
  }, [chatid]);
  const GetMessageList = async () => {
    const result = await axios.get("/api/history?recordId=" + chatid);
    //console.log(result.data)
    setMessageList(result?.data.content);
  };

  const onSend = async () => {
    setLoading(true);
    setMessageList((prev) => [
      ...prev,
      {
        content: userInput,
        role: "user",
        type: "text",
      },
    ]);
    const result = await axios.post("/api/ai-career-chat-agent", {
      userInput: userInput,
    });
    setUserInput("");
    console.log(result.data);
    setMessageList((prev) => [...prev, result.data]);
    setLoading(false);
  };

  useEffect(() => {
    //save to database whenver list changes.
    messageList?.length > 0 && updateMessageList();
  }, [messageList]);

  const updateMessageList = async () => {
    const result = await axios.put("/api/history", {
      content: messageList,
      recordId: chatid,
    });
  };

  const onNewChat = async () => {
    const id = uuidv4();
    const result = await axios.post("/api/history/", {
      recordId: id,
      content: [],
    });

    router.replace(id);
  };

  return (
    <div className="p-2 md:p-8 lg:p-10 xl:p-12 rounded-xl h-[76vh] overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">AI Career Q&A Chat</h2>
          <p>Smarter Career Decisions start here</p>
        </div>
        <Button onClick={onNewChat}>+New Chat</Button>
      </div>
      <div className="flex flex-col h-[60vh]">
        {messageList?.length <= 0 && (
          <div className="mt-5">
            <EmptyState
              selectedQuestion={(question: string) => setUserInput(question)}
            />
          </div>
        )}
        <div className="flex-1">
          {messageList?.map((message, index) => (
            <div>
              <div
                key={index}
                className={`flex mb-2 ${
                  message.role == "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg gap-2 ${
                    message.role == "user"
                      ? "bg-gray-200 text-black rounded-lg"
                      : "bg-gray-50 text-black rounded-lg"
                  }`}
                >
                  <ReactMarkDown>{message.content}</ReactMarkDown>
                </div>
              </div>
              {loading && messageList?.length - 1 == index && (
                <div className="flex p-3 mb-2 justify-start bg-gray-50 text-black rounded-lg">
                  <LoaderCircle className="animate-spin" /> Thinking...
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-6 absolute bottom-7 w-[70%]">
          <Input
            value={userInput || ""}
            placeholder="Type here.."
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button onClick={onSend} disabled={loading}>
            {" "}
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
