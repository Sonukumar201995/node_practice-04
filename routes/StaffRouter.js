const express=require("express");
const router=express.Router();

const Staff = require("../models/Staff");

// post api
router.post("/staff",async(req,res)=>{
       try
       {
        const data=req.body;
        const newStaff=new Staff(data);

        const response=await newStaff.save();
        console.log("data saved");
        res.status(201).json(response);
       }
       catch(error)
       {
        console.log(error);
        res.status(500).json({error: "internal server error"})
       }
})
// get api
router.get("/staff",async(req,res)=>{

    try
    {
        const data=await Staff.find();
        console.log("data fetch");
        res.status(200).json(data);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error :"internal server error"})
    }
})
// updata api
router.put("/staff/:id", async (req, res) => {
    try {
        const staffId = req.params.id;
        const updateStaffData = req.body;

        const response = await Staff.findByIdAndUpdate(
            staffId,
            updateStaffData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({ error: "Staff not found"});
        }

        console.log("Data updated successfully");
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});
// delete api
router.delete("/staff/:id",async(req,res)=>{
    try
    {
        const staffId=req.params.id;
        const response=await Staff.findByIdAndDelete(staffId);

        if(!response)
        {
            return res.status(404).json({error :"staff data not found"})
        }
        console.log("data deleted");
        res.status(200).json({message :"deletion successfully"})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
})

// parameter get api

router.get("/staff/:role",async(req,res)=>{
        try
        {
            const role=req.params.role;
            if(role==='Librarian' || role==='Assistant' || role==='Accountant' || role==='Security' || role==='Other')
            {
                const response=await Staff.find({profile:role});
                console.log("data fetch");
                res.status(200).json(response)
            }else
            {
                res.status(404).json({error:"invailid role"})
            }
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({error :"internal server error"})
        } 
})


module.exports=router;