import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import React from "react";

const Job = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            <div className="flex items-center justify-between ">
                <p className="font-sm text-gray-500">2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button>
                    <Avatar>
                        <AvatarImage src="https://imgs.search.brave.com/VBICu3sR8ER_uhqBnoo8MWJfmePo09A5N43l60FzMTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTkxNzk0NC92ZWN0/b3IvaGVhcnQtbG9n/by1zaWduLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1iR0xj/MGV3bk5wcFZ4MGxx/N3ZmMDVSZFRkeTI3/NVh4emVHcklwRUxF/clM0PQ" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="Font-medium text-lg">Company Name</h1>
                    <p className="font-sm text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">Title</h1>
                <p className="font-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti ullam eum officiis possimus laudantium!
                </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">
                    12 Position
                </Badge>
                <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                    Part Time
                </Badge>
                <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                    24LPA
                </Badge>
            </div>

            <div className="flex items-center mt-4 gap-4">
               <Button variant={'outline'} >Details</Button>
               <Button className="bg-[#7209b7]">Save for later</Button>
            </div>
        </div>
    );
};

export default Job;
