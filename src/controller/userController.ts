import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  if (!userData)
    return res.status(400).json({ error: "user Fields not found" });

  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (isExist) return res.status(401).json({ error: "user already exists" });
    const newUser = await prisma.user.create({
      data: {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      },
    });
    if (newUser)
      return res
        .status(200)
        .json({ message: "User created successfully", data: newUser });
    else return res.status(500).json({ error: "network error" });
  } catch (err) {
    console.log(err);
  }
};

export const userSign = async (req: Request, res: Response) => {
  const userData = req.body;

  if (!userData)
    return res.status(400).json({ error: "user Fields not found" });

  try {
    const exitingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!exitingUser) return res.status(404).json({ error: "User not found" });
    else if (exitingUser.password !== userData.password)
      return res.status(402).json({ error: "wrong password" });
    else return res.status(200).json({ data: exitingUser.id });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.body.id;
  
  if (!userId) return res.status(400).json({ error: "user Fields not found" });

  try {
    const response = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (response) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
  }
};
