const Transaction = require("../models/transaction");
const WhereClause = require("../utils/whereClause");

exports.createTransaction = async(req, res) => {
    try{

        const { order } = req.body;

        if(!order){
            return res.status(400).json({
                success: false,
                error: "Missing Order."
            });
        }

        const transactions = await Transaction.find({
            order
        });

        if(transactions.length > 0){
            return res.status(400).json({
                success: false,
                error: "Transaction Invalid, Order already has an transaction."
            })
        }

        const transaction = await Transaction.create({
            ...req.body,
            created_at: new Date()
        });

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

exports.getAllTransaction = async(req, res) => {
    try{
        const transactionObj = new WhereClause(Transaction, req.query).search().filter();

        const availableTransactions = await transactionObj.base;
    
        const availableTransactionsCount = availableTransactions.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 25;

        transactionObj.pager(RESULT_PER_PAGE);

        const transactions = await transactionObj.base.clone();

        const totalTransactionsCount = transactions.length;

        return res.status(200).json({
            success: true,
            transactions,
            totalTransactionsCount,
            availableTransactionsCount
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}