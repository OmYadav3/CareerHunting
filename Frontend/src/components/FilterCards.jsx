import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

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
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="w-full bg-white p-3 rounded-md ">
            <h1 className="font-bold text-lg ">Filter Job</h1>
            <hr className="mt-3" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className="font-bold text-lg">{data.filterType}</h1>
                        {data.Array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div
                                    key={itemId}
                                    className="flex items-center space-x-2 my-2 "
                                >
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
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
