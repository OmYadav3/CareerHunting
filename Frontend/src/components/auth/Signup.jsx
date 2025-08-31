import Navbar from "../shared/Navbar";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                    action=""
                    className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
                >
                    <h1 className="font-bold text-4xl mb-5">Sign up</h1>
                    <div className="my-6">
                        <Label className="mb-0.5">Full Name</Label>
                        <Input type="text" placeholder="Eg. OmYadav" />
                    </div>
                    <div className="my-6">
                        <Label className="mb-0.5">Email</Label>
                        <Input type="email" placeholder="example@example.com" />
                    </div>
                    <div className="my-6">
                        <Label className="mb-0.5">Phone</Label>
                        <Input type="number" placeholder="98XXXXXXXX" />
                    </div>
                    <div className="">
                        <Label className="mb-0.5">Password</Label>
                        <Input type="password" placeholder="password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-5 my-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center gap-2 ">
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <Button
                    type='submit'
                    className='w-full my-2 cursor-pointer'
                    >
                      Signup
                    </Button>
                    <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
Signup;
