const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");


const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey = generateSecretKey();
const moment = require("moment")
const jwt = require("jsonwebtoken");


mongoose
    .connect("mongodb+srv://alvaro:alvaro@cluster0.tetdq54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Conected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

const User = require("./models/user");
const Task = require("./models/task");
const { error } = require("console");

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Email already exist");
        }

        const newUser = new User({
            name, email, password
        });

        await newUser.save();

        res.status(202).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error registering the user", error);
        res.status(500).json({ message: "Registration failed " });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" })
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign({ userId: user._id, }, secretKey)

        res.status(200).json({ token });
    } catch (error) {
        console.log("Login failed", error);
        res.status(500).json({ message: "Login failed " });
    }
});

app.post("/tasks/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title } = req.body;
        const list=[];
        const newTask = new Task({
            title,
            date: moment().format("DD/MM/YYYY"),
            list,
        });

        await newTask.save();
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" })
        }
        user?.task.push(newTask._id);
        await user.save();

        res.status(200).json({ message: "Task add correctly", task: newTask })
    } catch (error) {
        res.status(200).json({ message: "Task was not added" })
    }
})


// Ruta para obtener las tareas de un usuario específico
app.get("/users/:userId/tasks", async (req, res) => {
    try {
        const userId = req.params.userId;
        // Buscar el usuario y poblar el campo de tareas
        const user = await User.findById(userId).populate("task");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Enviar la respuesta con las tareas del usuario
        res.status(200).json({ tasks: user.task });
    } catch (error) {
        // Manejo de errores y envío de respuesta de error
        res.status(500).json({ error: "Internal server error", userId:req.params.userId});
    }
});



app.patch("/tasks/:taskId/complete", async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            status: "completed",
        }, { new: true });
        if (!updatedTask) {
            res.status(404).json({ error: "Task not found tete" })
        }
        res.status(200).json({ error: "Task completed", task: updatedTask })
    } catch (error) {
        res.status(500).json({ error: "Mal tete" })
    }
})
/*
app.get("/tasks/complete/:date", async (req, res) => {
    try {
        const date = req.params.date;
        const completedTask = await Task.find({
            status: "completed",
            createdAt: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T23:59:59.999Z`),
            }
        }).exec();

        res.status(200).json({ completedTask });
    } catch (error) {
        res.status(500).json({ error: "Algo mal bebé si" });
    }
});*/
app.get("/tasks/complete/:date/:userId", async (req, res) => {
    try {
        const date = req.params.date;
        const userId = req.params.userId;
        const user = await User.findById(userId).populate({
            path: 'task',
            match: {
                status: "completed",
                createdAt: {
                    $gte: new Date(`${date}T00:00:00.000Z`),
                    $lt: new Date(`${date}T23:59:59.999Z`),
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ completedTask: user.task });
    } catch (error) {
        res.status(500).json({ error: "Algo mal" });
    }
});



app.get("/task/count", async (req, res) => {
    try {
        const totalCompletedTask = await Task.countDocuments({
            status: "completed"
        }).exec();

        const totalPendingTask = await Task.countDocuments({
            status: "pending"
        }).exec();

        res.status(200).json({ totalCompletedTask, totalPendingTask })
    } catch (error) {
        res.status(500).json({ error: "Algo mal" })
    }
})

