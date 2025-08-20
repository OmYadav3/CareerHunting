import Company from '../models/company.model.js'

export const registerCompany = async(req, res) => {
    try {
        const {companyName} = req.body
        if (!companyName) {
            return res.status(400).json({
                message:"Company name is already exists",
                success:false
            })
        }

        let company = await Company.findOne({companyName})
        if (!company) {
            return res.status(400).json({
                message:"You cannot register the same company",
                success:false
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(201).json({
            message: "Company register Successfully",
            company,
            success:true
        })

    } catch (error) {
        console.log("ERROR TO REGISTER: ", error)
        return res.status(500).json({
         message: "Internal server error",
         success: false,
      });

    }
}

export const getCompany = async (req, res) => {
    try {
        
        const userId = req.id
        const companies = await Company.find({userId})
        if (!companies) {
            return res.status(400).json({
                message:"Cannot find any company",
                success:false
            })
        }
        
    } catch (error) {
        console.log("ERROR TO GETING THE COMPANY: ", error)
        return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
    }
}