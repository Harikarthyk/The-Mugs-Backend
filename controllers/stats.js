const Order = require("../models/order");

exports.dashBoardStats = async(req, res) => {
    try{

        // totalRevenue
        const totalRevenue = await Order.findOne(
            { 
                $ne : { status: "DECLINED" } 
            },
            {
                totalRevenue: { $sum: "$total" }
            }
        );

        return res.status(200).json({
            totalRevenue
        });

        // this month revenue

        // total order placed

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
}