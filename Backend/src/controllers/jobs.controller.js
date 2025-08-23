import {Job} from "../models/job.model"

export const postJob = async(req, res) => {
    try {
        const {title, description, requirments, salary, location, jobType, experience, position, companyId } = req.body

        const userId = req.id;

        if (!title || !description || !requirments || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message:'Something is mising in required fileds',
                success:false
            })
        }

        const job = await Job.create({
            title,
            description, 
            requirments: requirments.split(","), 
            salary:Number(salary), 
            location, 
            jobType,
            experienceLevel:experience, 
            position, 
            comapmny:companyId,
            created_by: userId
        })
        console.log(job)

        return res.status(201).json({
            message:'New Job created successfully',
            job,
            success:true
        })
        
    } catch (error) {
        console.log("ERROR TO GETING POST THE JOB: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });

    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }

        const jobs = await Job.find(query);
        if (!jobs) {
            return res.status(404).json({
                message:'Jobs not found',
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })


    } catch (error) {
         console.log("ERROR TO GETING ALL THE JOBS: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
        
    }
}

