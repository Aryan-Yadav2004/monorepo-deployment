import "dotenv/config";
import express from "express";
import { prismaClient, type User } from "db";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
    prismaClient.user.findMany()
        .then((users: User[]) => {
            res.json(users);
        })
        .catch((err: unknown) => {
            const message = err instanceof Error ? err.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        });
})

app.post("/user", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return
    }

    prismaClient.user.create({
        data: {
            username,
            password
        }
    })
        .then(user => {
            res.status(201).json(user);
        })
        .catch((err: unknown) => {
            const message = err instanceof Error ? err.message : "An unknown error occurred";
            res.status(500).json({ error: message });
        });
})

app.listen(8080);