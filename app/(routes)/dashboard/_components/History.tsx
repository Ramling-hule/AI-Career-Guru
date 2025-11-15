"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { aiToolsList } from "./AiToolsList";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetHistory();
  }, []);

  const GetHistory = async () => {
    setLoading(true);
    const result = await axios.get("/api/history");
    console.log(result.data);
    setUserHistory(result.data);
    setLoading(false);
  };

  const GetAgentName = (path: string) => {
    const agent = aiToolsList.find((item) => item.path == path);
    return agent;
  };

  return (
    <div className="mt-5 p-5 border rounded-xl">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What you previously worked on, you can find here.</p>

      {loading && 
        <div className="mt-4">
          {[1,2,3,4].map((item, index) => (
            <div key={index}>
              <Skeleton className="animate-pulse mt-4 h-[50px] w-full rounded-md"/>
            </div>
          ))},
        </div>
      }
      
      {(userHistory?.length == 0 && !loading) ? (
        <div className="flex items-center justify-center flex-col mt-6">
          <Image src={"/idea.png"} alt="bulb" width={50} height={50} />

          <h2>You do not have any history</h2>
          <Button className="mt-5">Explore AI Tools</Button>
        </div>
      ) : (
        <div>
          {userHistory?.map((history: any, index: number) => (
            <Link href={history?.aiAgentType+'/'+history.recordId || '/dashboard'} key={index} className='flex justify-between items-center mt-2 border rounded-xl p-5'>
              <div
                key={index}
                className="flex gap-5"
              >
                <Image
                // @ts-ignore
                  src={GetAgentName(history?.aiAgentType)?.icon}
                  alt="image"
                  width={20}
                  height={20}
                />
                <h2 className="font-bold">
                  {GetAgentName(history?.aiAgentType)?.name}
                </h2>
              </div>
              <h2>{history.createdAt}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
