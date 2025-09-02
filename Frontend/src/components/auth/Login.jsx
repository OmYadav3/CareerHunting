import Navbar from "../shared/Navbar";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from 'axios';
import { USER_API_ENDPOINT } from "../../utils/constant.js";


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = useCallback((e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }, []);

    const submitHandler = useCallback(
          async (e) => {
              e.preventDefault();
              console.log(input);
             
  
              try {
                  const res = await axios.post(
                      `${USER_API_ENDPOINT}/login`,
                      input,
                      {
                          headers: {
                              "Content-Type": "application/json",
                          },
                          withCredentials: true,
                      }
                  );
                  if (res.data.success) {
                      navigate("/");
                      toast.success(res.data.message);
                  }
              } catch (error) {
                  console.log(
                      "ERROR OCCURE WHILE LOGIN THE USER ON FRONTEND SIDE",
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
                    <h1 className="font-bold text-4xl mb-5">Login</h1>
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
                    <div className="">
                        <Label className="mb-0.5">Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
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
                    </div>
                    <Button
                        type="submit"
                        className="w-full my-2 cursor-pointer"
                    >
                        Login
                    </Button>
                    <span className="text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
