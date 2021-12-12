const Transaction = require("../models/transaction");

exports.createTransaction = async(req, res) => {
    try{

        const transaction = await Transaction.create(
            req.body
        );

        return res.status(201).json({
            success: true,
            transaction
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
}

exports.updateTransaction = async(req, res) => {
    try{
        
        const { transactionId } = req.params;

        const transaction = await Transaction.findOneAndUpdate(
            { _id: transactionId },
            { $set: req.body }
        );

        return res.status(200).json({
            success: true,
            transaction
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
}