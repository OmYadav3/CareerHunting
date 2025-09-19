import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleJob } from "../redux/jobSlice";

const useGetSingleJobs = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJobs();
    }, []);
};

export default useGetSingleJobs;
