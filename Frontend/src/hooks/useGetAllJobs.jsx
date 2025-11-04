import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const endpoint = searchedQuery
                    ? `${JOB_API_END_POINT}/all?keyword=${searchedQuery}`
                    : `${JOB_API_END_POINT}/all`;

                const res = await axios.get(endpoint, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllJobs();
    }, []);
};

export default useGetAllJobs;
