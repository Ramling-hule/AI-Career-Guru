"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AIReportDisplay } from "./_components/AIReportDisplay";

function AiResumeAnalyzer() {
  const { recordid } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [aiReport, setAiReport] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recordid) {
      GetResumeAnalyzerRecord();
    }
  }, [recordid]);

  const GetResumeAnalyzerRecord = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/history?recordId=${recordid}`);

      setPdfUrl(result.data?.metaData);
      setAiReport(result.data?.content);
      console.log("Fetched AI Report:", result.data?.content);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 grid-cols-1">
      <div className="col-span-3">
        {loading ? (
          <p className="p-4 text-gray-500">Loading report...</p>
        ) : aiReport ? (
          <AIReportDisplay aiReport={aiReport} />
        ) : (
          <p className="p-4 text-red-500">No report found.</p>
        )}
      </div>

      <div className="col-span-2 flex justify-center">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            width={800}
            height={1200}
            style={{ border: "none" }}
          />
        ) : (
          <p className="p-4 text-gray-500">PDF not available</p>
        )}
      </div>
    </div>
  );
}

export default AiResumeAnalyzer;
