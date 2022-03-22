const Transaction = require("../models/transaction");

exports.dashBoardStats = async(req, res) => {
    try{
        const totalRevenue = await Transaction.aggregate(
            // { 
            //     status: "PAID"  
            // },
            // {
            //     revenue: { $sum: "$amount" }
            // }
            [
                {
                    $match: {
                        status: "PAID"
                    }
                },
                {
                    $group: {
                        _id: 'totalRevenue',
                        revenue: {
                            $sum: '$amount'
                        }
                    }
                }
            ]
        );
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        // const temp = await Transaction.find({});
        // console.log(totalRevenue);
        // this month revenue
        const totalRevenueByMonth = await Transaction.aggregate(
            // {
            //     status: "captured",
            //     created_at: {
            //         "$gte": monthStart,
            //         "$lte": today
            //     }
            // },
            // {
            //     revenue: { $sum: "$amount" }
            // }
            [
                {
                    $match: {
                        status: "PAID",
                        created_at: {
                            "$gte": monthStart,
                            "$lte": today
                        }
                    }
                },
                {
                    $group: {
                        _id: 'totalRevenue',
                        revenue: {
                            $sum: '$amount'
                        }
                    }
                }
            ]
        )|| [{
            _id: "totalRevenueByMonth",
            "revenue": 0
        }];

        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
        const totalRevenueByWeek = await Transaction.aggregate(
            // {
            //     status: "captured",
            //     created_at: {
            //         "$gte": weekStart,
            //         "$lte": today
            //     }
            // },
            // {
            //     revenue: { $sum: "$amount" }
            // }
            [
                {
                    $match: {
                        status: "PAID",
                        created_at: {
                            "$gte": weekStart,
                            "$lte": today
                        }
                    }
                },
                {
                    $group: {
                        _id: 'totalRevenue',
                        revenue: {
                            $sum: '$amount'
                        }
                    }
                }
            ]
        )|| [{
            _id: "totalRevenueByWeek",
            "revenue": 0
        }];

        const dayStart = new Date();

        dayStart.setUTCHours(0,0,0,0);
        const totalRevenueByToday = await Transaction.aggregate(
            // {
            //     status: "captured",
            //     created_at: {
            //         "$gte": dayStart,
            //     }
            // },
            // {
            //     revenue: { $sum: "$amount" }
            // }
            [
                {
                    $match: {
                        status: "PAID",
                        created_at: {
                            "$gte": dayStart,
                    
                        }
                    }
                },
                {
                    $group: {
                        _id: 'totalRevenue',
                        revenue: {
                            $sum: '$amount'
                        }
                    }
                }
            ]
        ) || [{
            _id: "totalRevenueByToday",
            "revenue": 0
        }];

        return res.status(200).json({
            totalRevenue: totalRevenue[0],
            totalRevenueByMonth: totalRevenueByMonth[0],
            totalRevenueByWeek: totalRevenueByWeek[0],
            totalRevenueByToday: totalRevenueByToday[0]
        });

        // total order placed

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
}