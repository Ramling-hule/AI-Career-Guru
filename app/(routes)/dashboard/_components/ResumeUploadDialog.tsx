"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, Loader, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";

function ResumeUploadDialog({openResumeUpload, setOpenResumeDialog} : any) {

    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFileChange = (event : any) => {
        const file = event.target.files?.[0];
        if(file) {
            setFile(file);
            console.log(file);
        }
    }

    const onUploadAndAnalyze = async () => {
      setLoading(true);
      const recordId = uuidv4();

      const formData = new FormData();
      formData.append('recordId', recordId);
      formData.append('resumeFile', file);
      

      const result = await axios.post('/api/ai-resume-agent', formData);
      console.log(result.data);
      setLoading(false);
      router.push('/ai-tools/ai-resume-analyzer/'+recordId);
      setOpenResumeDialog(false);
    }


  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            
            <div>
                <label htmlFor="resume-upload" className="flex items-center justify-center flex-col
                 p-7 border border-dashed rounded-xl
                 hover:bg-slate-100 cursor-pointer mt-4" > 
                    <File className="h-10 w-10"/>
                    {(file)? <h2 className="mt-3 text-blue-400">{file.name}</h2>:
                    <h2 className="mt-3">Click here to Upload the resume</h2>}
                </label>
                <input type="file" id="resume-upload" accept="application/pdf" className="hidden" onChange={onFileChange} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant={"outline"}>Cancel</Button>
            <Button disabled={!file || loading} onClick={onUploadAndAnalyze}> 
              {loading ? <Loader className="animate-spin" /> : <Sparkles />} Upload & Analyze</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeUploadDialog;
