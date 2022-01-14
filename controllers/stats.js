const Transaction = require("../models/transaction");

exports.dashBoardStats = async(req, res) => {
    try{
        const totalRevenue = await Transaction.findOne(
            { 
                status: "captured"  
            },
            {
                revenue: { $sum: "$amount" }
            }
        );
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        // this month revenue
        const totalRevenueByMonth = await Transaction.findOne(
            {
                status: "captured",
                created_at: {
                    "$gte": monthStart,
                    "$lte": today
                }
            },
            {
                revenue: { $sum: "$amount" }
            }
        )|| {
            _id: "totalRevenueByMonth",
            "revenue": 0
        };

        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
        const totalRevenueByWeek = await Transaction.findOne(
            {
                status: "captured",
                created_at: {
                    "$gte": weekStart,
                    "$lte": today
                }
            },
            {
                revenue: { $sum: "$amount" }
            }
        )|| {
            _id: "totalRevenueByWeek",
            "revenue": 0
        };

        const dayStart = new Date();

        dayStart.setUTCHours(0,0,0,0);
        const totalRevenueByToday = await Transaction.findOne(
            {
                status: "captured",
                created_at: {
                    "$gte": dayStart,
                }
            },
            {
                revenue: { $sum: "$amount" }
            }
        ) || {
            _id: "totalRevenueByToday",
            "revenue": 0
        };

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