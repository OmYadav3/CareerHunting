import React from "react";
import { Badge } from "@/components/ui/badge";

const LatestJobCard = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-center">
            <div>
                <h1 className="font-medium text-lg">Company</h1>
                <p className="font-sm text-gray-500">India</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">Job Title</h1>
                <p className="font-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti ullam eum officiis possimus laudantium!
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'text-blue-700 font-bold'} variant='ghost'>12 Position</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant='ghost'>Part Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>24LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCard;
