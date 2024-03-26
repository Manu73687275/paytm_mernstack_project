const express = require("express");
const { authMiddleware } = require("../middlewre");
const {Account}=require("../db");
const { default: mongoose } = require("mongoose");
const router=express.Router();

router.use(express.json())

router.get("/balance", authMiddleware, async function(req, res) {
    const authuserid = req.userId;
    try {
        const getuser = await Account.findOne({
            userId: authuserid
        });

        if (!getuser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            msg: getuser.Balance
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/transfer",authMiddleware,async function(req,res){
    const session=await mongoose.startSession();

    session.startTransaction();

    const amount=req.body.amount;
    const to=req.body.to;

    const account=await Account.findOne({userId:req.userId}).session(session);
    if(!account || account.Balance<amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            msg:"insufficient balance"
        })
    }

    const toaccount=await Account.findOne({userId:to}).session(session);
        
    if(!toaccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            msg:'invalid account'
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{Balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{Balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        msg:"transfer successfully"
    })
})




module.exports=router;