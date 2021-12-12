const Transaction = require("../models/transaction");

exports.dashBoardStats = async(req, res) => {
    try{

        // totalRevenue
        const totalRevenue = await Transaction.findOne(
            { 
                status: "captured"  
            },
            {
                totalRevenue: { $sum: "$amount" }
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