import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger} from '../ui/popover'
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2Icon, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>
                    A List of your recent register companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell>
                        <Avatar>
                            <AvatarImage
                                src="https://imgs.search.brave.com/VBICu3sR8ER_uhqBnoo8MWJfmePo09A5N43l60FzMTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTkxNzk0NC92ZWN0/b3IvaGVhcnQtbG9n/by1zaWduLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1iR0xj/MGV3bk5wcFZ4MGxx/N3ZmMDVSZFRkeTI3/NVh4emVHcklwRUxF/clM0PQ"
                                alt="UserProfilePic"
                            />
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>18-10-2025</TableCell>
                    <TableCell className="text-right cursor-pointer" >
                     <Popover>
                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className="w-32 ">
                           <div className="flex items-center justify-center gap-2 w-fit cursor-pointer">
                              <Edit2Icon className="w-4" />
                              <span>Edit</span>
                           </div>
                        </PopoverContent>
                     </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
