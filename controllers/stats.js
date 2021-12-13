const Transaction = require("../models/transaction");

exports.dashBoardStats = async(req, res) => {
    try{
        const totalRevenue = await Transaction.findOne(
            { 
                status: "captured"  
            },
            {
                totalRevenue: { $sum: "$amount" }
            }
        );
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        // this month revenue
        const totalRevenueByMonth = await Transaction.findOne(
            {
                status: "captured",
                createdAt: {
                    "$gte": monthStart,
                    "$lte": today
                }
            },
            {
                totalRevenue: { $sum: "$amount" }
            }
        );

        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
        const totalRevenueByWeek = await Transaction.findOne(
            {
                status: "captured",
                createdAt: {
                    "$gte": weekStart,
                    "$lte": today
                }
            },
            {
                totalRevenue: { $sum: "$amount" }
            }
        );

        const dayStart = new Date();

        dayStart.setUTCHours(0,0,0,0);

        const totalRevenueByToday = await Transaction.findOne(
            {
                status: "captured",
                createdAt: {
                    "$gte": dayStart,
                }
            },
            {
                totalRevenue: { $sum: "$amount" }
            }
        );

        return res.status(200).json({
            totalRevenue,
            totalRevenueByMonth,
            totalRevenueByWeek,
            totalRevenueByToday
        });

        // total order placed

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
}