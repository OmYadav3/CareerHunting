import Navbar from "../shared/Navbar";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { USER_API_ENDPOINT } from "../../utils/constant.js";
import axios from 'axios'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        // file: "",
    });

    const navigate = useNavigate();

    const changeEventHandler = useCallback((e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }, []);

    const changeFileHandler = useCallback((e) => {
        const file = e.target.files?.[0];
        setInput((prev) => ({ ...prev, file }));
    }, []);

    const submitHandler = useCallback(
        async (e) => {
            e.preventDefault();
            console.log(input);
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("password", input.password);
            formData.append("role", input.role);
            // if (file) {
            //     formData.append("file", input.file);
            // }else{
            //     console.log("file is not define")
            // }

            try {
                const res = await axios.post(
                    `${USER_API_ENDPOINT}/register`,
                    FormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-Data",
                        },
                        withCredentials: true,
                    }
                );
                if (res.data.success) {
                    navigate("/login");
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(
                    "ERROR OCCURE WHILE REGISTER THE USER ON FRONTEND SIDE",
                    error
                );
            }
        },
        [input]
    );

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
                >
                    <h1 className="font-bold text-4xl mb-5">Sign up</h1>
                    <div className="my-6">
                        <Label className="mb-0.5">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Eg. OmYadav"
                        />
                    </div>
                    <div className="my-6">
                        <Label className="mb-0.5">Email</Label>
                        <Input
                            type="email"
                            placeholder="example@example.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="my-6">
                        <Label className="mb-0.5">Phone</Label>
                        <Input
                            type="text"
                            placeholder="98XXXXXXXX"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="">
                        <Label className="mb-0.5">Password</Label>
                        <Input
                            type="password"
                            placeholder="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-5 my-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
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
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full my-2 cursor-pointer"
                    >
                        Signup
                    </Button>
                    <span className="text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
