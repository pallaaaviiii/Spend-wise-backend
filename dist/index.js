"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userController_1 = require("./controller/userController");
const transactionControl_1 = require("./controller/transactionControl");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ success: true, "message": "hello world!" });
});
app.post("/api/createUser", userController_1.createUser);
app.post("/api/userSign", userController_1.userSign);
app.post("/api/add-income", transactionControl_1.addIncome);
app.post("/api/add-expense", transactionControl_1.addExpense);
app.post("/api/get-incomes", transactionControl_1.getIncome);
app.post("/api/get-expenses", transactionControl_1.getExpenses);
app.post("/api/delete-income", transactionControl_1.deleteIncome);
app.post("/api/delete-expense", transactionControl_1.deleteExpense);
app.post("/api/getUser", userController_1.getUser);
app.listen(5000, () => {
    console.log("listening on port 5000");
});
