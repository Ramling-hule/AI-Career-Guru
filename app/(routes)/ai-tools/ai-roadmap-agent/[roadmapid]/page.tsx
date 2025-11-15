"use client"

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RoadmapCanvas from '../_components/RoadmapCanvas';
import RoadmapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog';

function RoadmapGeneratorAgent() {

    const {roadmapid} = useParams();
    const [roadmapDetails, setRoadmapDetails] = useState<any>();
    const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);

    useEffect(() => {
        roadmapid && GetRoadmapDetails();
    }, [roadmapid])

    const GetRoadmapDetails = async () => {
        const result = await axios.get('/api/history?recordId='+roadmapid);
        setRoadmapDetails(result.data?.content);
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 h-screen'>
        <div className='border rounded-xl p-5 h-[80vh]'>
            <h2 className='font-bold text-2xl'>{roadmapDetails?.roadmapTitle}</h2>
            <p className='mt-3 text-gray-500'><strong>Description:</strong><br />{roadmapDetails?.description}</p>
            <h2 className='mt-5 font-medium text-blue-600'>Duration: {roadmapDetails?.duration}</h2>

            <Button onClick={() => setOpenRoadmapDialog(true)} className='mt-5 w-full'> <PlusIcon /> Create Another Roadmap</Button>
        </div>
        <div className='md:col-span-2 w-full h-[80vh]'>
            <RoadmapCanvas initialEdges={roadmapDetails?.initialEdges} initialNodes={roadmapDetails?.initialNodes} />
        </div>

      <RoadmapGeneratorDialog 
        openDialog={openRoadmapDialog}
        setOpenDialog={() => setOpenRoadmapDialog(false)}
      />
    </div>
  )
}

export default RoadmapGeneratorAgent