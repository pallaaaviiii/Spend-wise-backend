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
exports.getUser = exports.userSign = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    if (!userData)
        return res.status(400).json({ error: "user Fields not found" });
    try {
        const isExist = yield prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (isExist)
            return res.status(401).json({ error: "user already exists" });
        const newUser = yield prisma.user.create({
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
        else
            return res.status(500).json({ error: "network error" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createUser = createUser;
const userSign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    if (!userData)
        return res.status(400).json({ error: "user Fields not found" });
    try {
        const exitingUser = yield prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (!exitingUser)
            return res.status(404).json({ error: "User not found" });
        else if (exitingUser.password !== userData.password)
            return res.status(402).json({ error: "wrong password" });
        else
            return res.status(200).json({ data: exitingUser.id });
    }
    catch (err) {
        console.log(err);
    }
});
exports.userSign = userSign;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    if (!userId)
        return res.status(400).json({ error: "user Fields not found" });
    try {
        const response = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (response) {
            return res.status(200).json(response);
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.getUser = getUser;
