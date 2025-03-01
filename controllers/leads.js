const Lead = require('../models/lead');

exports.createlead = async(req, res) => {
    try {
        
            if(!req.body.phone){
                return res.status(400).send({ message: "please enter phone" });
            }

            const checkLead = await Lead.findOne({phone:req.body.phone});
            if(checkLead)
                return res.status(400).send({ message: "Lead Already exists" });

            var randomnumber = Math.random().toString().substr(2, 6);

            const mylead = await Lead({
                phone: req.body.phone,
                name: "user"+randomnumber,
                status: "WIP1"
            })
            await mylead.save();
            if (mylead) {
                return res.status(200).json(mylead);
            } else {
                return res.status(400).json({ message: "Internal server error" })
            }
    }catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.deleteLead = async(req, res) => {
    try {
        if(!req.body.phone)
        return res.status(400).json({ message: "phone required" })
        console.log(req.body.phone)

        const mylead = await Lead.deleteOne({phone:req.body.phone});
        console.log(mylead)
        if (mylead) {
            return res.status(200).json({message: "Lead Deleted"});
        } else{
            return res.status(400).json({ message: "Lead not found" })
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};