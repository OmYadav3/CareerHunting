import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
    {
        filterType: "Location",
        Array: ["Delhi NCR", "Pune", "Bangalore", "Mumbai"],
    },
    {
        filterType: "Industry",
        Array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
        ],
    },
    {
        filterType: "Salary",
        Array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
    },
];

const FilterCards = () => {
    return (
        <div className="w-full bg-white p-3 rounded-md ">
            <h1 className="font-bold text-lg ">Filter Job</h1>
            <hr className="mt-3" />
            <RadioGroup>
                {filterData.map((data, index) => (
                    <div>
                        <h1 className="font-bold text-lg">{data.filterType}</h1>
                        {data.Array.map((item, index) => {
                            return (
                                <div className="flex items-center space-x-2 my-2 ">
                                    <RadioGroupItem value={item} />
                                    <Label>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCards;
