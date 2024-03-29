const express=require("express");
const zod=require("zod")
const jwt=require("jsonwebtoken");
const router=express.Router();
const { JWT_SECRET } = require("../config");
const { User } = require("../db");
const {Account} = require("../db")
const {authMiddleware} = require("../middlewre");


router.use(express.json())


const signupBody=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async function(req,res){
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userId = user._id;

        await Account.create({
            userId:userId,
            Balance:1 + Math.random() * 10000
        })

    
        const token = jwt.sign({
            userId
        }, JWT_SECRET);
    
        res.json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        res.json({
            msg:"error from signup"
        })
    }
})


const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async function(req,res){

    const {success}=signinBody.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({
            msg:"wrong credentials"
        })
    }
    const user=await User.findOne({
        username:req.body.username
    })
    if(user)
    {
        const token=jwt.sign({userId:user._id},JWT_SECRET);
        res.json({
            token
        })
        return;
    }
    res.status(411).json({
        msg:"wrong username"
    })
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body); // Corrected argument order and object structure
        res.json({
            message: "Updated successfully"
        });
    } catch (error) {
    
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/bulk",async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports=router;





















































