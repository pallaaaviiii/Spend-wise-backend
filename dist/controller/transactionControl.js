"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.getExpenses = exports.addExpense = exports.deleteIncome = exports.getIncome = exports.addIncome = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionData = req.body;
    if (!transactionData)
        return res.status(400).json({ error: "user Fields not found" });
    try {
        const response = yield prisma.incomeSchema.create({
            data: {
                amount: +transactionData.amount,
                category: transactionData.category,
                description: transactionData.description,
                title: transactionData.title,
                user: {
                    connect: {
                        id: transactionData.userId,
                    },
                },
                date: transactionData.date,
            },
        });
        if (response) {
            return res.status(200).json({ message: "successfully added" });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.addIncome = addIncome;
const getIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    if (!userId)
        return res.status(400).json({ error: "userId Fields not found" });
    try {
        const incomeData = yield prisma.incomeSchema.findMany({
            where: {
                userId: userId,
            },
        });
        if (incomeData) {
            return res.status(200).json({ data: incomeData });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.getIncome = getIncome;
const deleteIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body;
    if (!userId)
        return res.status(400).json({ error: "userId Fields not found" });
    try {
        yield prisma.incomeSchema.delete({
            where: {
                userId: userId.userId,
                id: userId.id
            }
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.deleteIncome = deleteIncome;
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionData = req.body;
    if (!transactionData)
        return res.status(400).json({ error: "user Fields not found" });
    try {
        const response = yield prisma.expenseSchema.create({
            data: {
                amount: +transactionData.amount,
                category: transactionData.category,
                description: transactionData.description,
                title: transactionData.title,
                user: {
                    connect: {
                        id: transactionData.userId,
                    },
                },
                date: transactionData.date,
            },
        });
        if (response) {
            return res.status(200).json({ message: "successfully added" });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.addExpense = addExpense;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    if (!userId)
        return res.status(400).json({ error: "userId Fields not found" });
    try {
        const incomeData = yield prisma.expenseSchema.findMany({
            where: {
                userId: userId,
            },
        });
        if (incomeData) {
            return res.status(200).json({ data: incomeData });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.getExpenses = getExpenses;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body;
    if (!userId)
        return res.status(400).json({ error: "userId Fields not found" });
    try {
        yield prisma.expenseSchema.delete({
            where: {
                userId: userId.userId,
                id: userId.id
            }
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.deleteExpense = deleteExpense;
