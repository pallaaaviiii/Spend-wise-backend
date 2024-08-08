import express from 'express';
import cors from 'cors';
import { createUser, getUser, userSign } from './controller/userController';
import { addExpense, addIncome, deleteExpense, deleteIncome, getExpenses, getIncome } from './controller/transactionControl';


const app = express();
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.json({success:true,"message":"hello world!"})
})


app.post("/api/createUser", createUser)
app.post("/api/userSign", userSign)
app.post("/api/add-income", addIncome)
app.post("/api/add-expense", addExpense)
app.post("/api/get-incomes", getIncome)
app.post("/api/get-expenses", getExpenses)
app.post("/api/delete-income", deleteIncome)
app.post("/api/delete-expense", deleteExpense)


app.post("/api/getUser", getUser)


app.listen(5000, () => {
    console.log("listening on port 5000" );
    
})