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