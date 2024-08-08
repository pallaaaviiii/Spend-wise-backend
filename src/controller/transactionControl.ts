import { PrismaClient } from "@prisma/client";import { Request, Response } from "express";
const prisma = new PrismaClient();

export const addIncome = async (req: Request, res: Response) => {
  const transactionData = req.body;

  if (!transactionData)
    return res.status(400).json({ error: "user Fields not found" });

  try {
    const response = await prisma.incomeSchema.create({
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
  } catch (e) {
    console.log(e);
  }
};

export const getIncome = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (!userId)
    return res.status(400).json({ error: "userId Fields not found" });
  try {
    const incomeData = await prisma.incomeSchema.findMany({
      where: {
        userId: userId,
      },
    });
    if (incomeData) {
      return res.status(200).json({ data: incomeData });
    }
  } catch (e) {
    console.log(e);
  }
};


export const deleteIncome = async (req: Request, res: Response) => {
  const userId = req.body;
  if (!userId)
    return res.status(400).json({ error: "userId Fields not found" });

  try{
    await prisma.incomeSchema.delete({
      where:{
        userId:userId.userId,
        id:userId.id
      }
    })
  }catch (e){
    console.log(e);
  }
}





export const addExpense = async (req: Request, res: Response) => {
  const transactionData = req.body;

  if (!transactionData)
    return res.status(400).json({ error: "user Fields not found" });

  try {
    const response = await prisma.expenseSchema.create({
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
  } catch (e) {
    console.log(e);
  }
};



export const getExpenses = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (!userId)
    return res.status(400).json({ error: "userId Fields not found" });
  try {
    const incomeData = await prisma.expenseSchema.findMany({
      where: {
        userId: userId,
      },
    });
    if (incomeData) {
      return res.status(200).json({ data: incomeData });
    }
  } catch (e) {
    console.log(e);
  }
};


export const deleteExpense = async (req: Request, res: Response) => {
  const userId = req.body;
  if (!userId)
    return res.status(400).json({ error: "userId Fields not found" });

  try{
    await prisma.expenseSchema.delete({
      where:{
        userId:userId.userId,
        id:userId.id
      }
    })
  }catch (e){
    console.log(e);
  }
}