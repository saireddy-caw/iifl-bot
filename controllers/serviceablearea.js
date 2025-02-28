const serviceablearea = require('../models/serviceable');

exports.addarea = async(req, res) => {
    try {
        
            if(!req.body.area){
                return res.status(400).send({ message: "please enter area" });
            }

            const myarea = await serviceablearea({
                area: req.body.area
            })
            await myarea.save();
            if (myarea) {
                return res.status(200).json(myarea);
            } else {
                return res.status(400).json({ message: "Internal server error" })
            }
    }catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.getArea = async(req, res) => {
    try {
        if(!req.query.area)
        return res.status(400).json({ message: "area required" })

        const myarea = await serviceablearea.findOne({area:req.query.area});
        console.log(myarea)

        if (myarea) {
            return res.status(200).json(myarea);
        } else{
            return res.status(400).json({ message: "Area not found" })
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};