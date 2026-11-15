
const db = require("./db");
const Staff = require("./models/Staff");

const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to our Library Management System");
});


// post api

app.post("/staff",async(req,res)=>{
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
app.get("/staff",async(req,res)=>{

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

app.put("/staff/:id", async (req, res) => {
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

app.delete("/staff/:id",async(req,res)=>{
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

// Server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
