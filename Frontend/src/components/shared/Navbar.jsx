import { LogOutIcon, User2Icon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = false;
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">
                        Career<span className="text-[#f83002]">Hunting</span>
                    </h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li>
                            {" "}
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            {" "}
                            <Link to={"/jobs"}>Jobs</Link>
                        </li>
                        <li>
                            {" "}
                            <Link to={"/Browse"}>Browse</Link>
                        </li>
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to={"/login"}>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to={"/signup"}>
                                <Button className="bg-[#6a37c4] hover:bg-[#5318b7] cursor-pointer">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex items-center gap-4 space-y-2 ">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">
                                            OmYadav MernStack
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Lorem ipsum dolor, sit amet{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-gray-600 my-2">
                                    <div className="flex w-fit items-center gap-2 cursor-pointer ">
                                        <User2Icon />
                                        <Button variant="link">
                                            View Profile
                                        </Button>
                                    </div>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOutIcon />
                                        <Button variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
