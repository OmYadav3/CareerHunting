import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
 
const isResume = true;

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl bg-white rounded-2xl mx-auto border border-gray-200 my-5 p-8">
                <div className="flex justify-between ">
                    <div className="flex items-center gap-4">
                        <Avatar className="border h-24 w-24 ">
                            <AvatarImage
                                src="https://imgs.search.brave.com/VBICu3sR8ER_uhqBnoo8MWJfmePo09A5N43l60FzMTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTkxNzk0NC92ZWN0/b3IvaGVhcnQtbG9n/by1zaWduLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1iR0xj/MGV3bk5wcFZ4MGxx/N3ZmMDVSZFRkeTI3/NVh4emVHcklwRUxF/clM0PQ"
                                alt="UserProfilePic"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p>
                             {user?.profile?.bio}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className="text-right "
                        variant="outline"
                    >
                        <Pen />
                    </Button>
                </div>

                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex items-center gap-2">
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge key={index}>{item}</Badge>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {isResume ? (
                        <a
                            target="blank"
                            href={user?.profile?.resume}
                            className="text-blue-600 w-full hover:underline cursor-pointer"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-2xl my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
