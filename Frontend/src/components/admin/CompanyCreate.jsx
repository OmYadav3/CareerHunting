import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {

  const navigate = useNavigate( )
   
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p>
                        What would you like to give your company name? You need
                        to change this later.
                    </p>
                </div>
                <Label>Company Name </Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Micrsoft, etc."
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick={() => navigate("/admin/companies")} >Cancel</Button>
                    <Button>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
