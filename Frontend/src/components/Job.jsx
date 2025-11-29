import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const JobId = "aefhnaf6f59faafs";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    

    const fallbackLogo = "https://imgs.search.brave.com/VBICu3sR8ER_uhqBnoo8MWJfmePo09A5N43l60FzMTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTkxNzk0NC92ZWN0/b3IvaGVhcnQtbG9n/by1zaWduLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1iR0xj/MGV3bk5wcFZ4MGxx/N3ZmMDVSZFRkeTI3/NVh4emVHcklwRUxF/clM0PQ";

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            <div className="flex items-center justify-between ">
                <p className="font-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago `}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <div>
                    <Avatar className="border border-gray-100">
                        <AvatarImage
                            src={job?.company?.logo || fallbackLogo} 
                            // src={job?.company?.logo}
                            alt="UserProfilePic"
                        />
                    </Avatar>
                </div>
                <div>
                    <h1 className="Font-medium text-lg">
                        {job?.company?.name || "Unknown Company"}
                    </h1>
                    <p className="font-sm text-gray-500">{job?.location || "India"}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="font-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">
                    {job?.position} positions
                </Badge>
                <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                    {job?.salary}LPA
                </Badge>
            </div>

            <div className="flex items-center mt-4 gap-4">
                <Button
                    variant={"outline"}
                    onClick={() => navigate(`/description/${job?._id}`)}
                >
                    Details
                </Button>
                <Button className="bg-[#7209b7]">Save for later</Button>
            </div>
        </div>
    );
};

export default Job;
