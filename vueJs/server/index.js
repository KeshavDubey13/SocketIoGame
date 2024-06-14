import http from 'http'
import express from "express"
import { Server } from "socket.io"

const app = express()


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    }
})

let count = -1
const randomButtlet = Math.round(Math.random() * 5)
const list = []

io.on("connection", (socket) => {

    socket.emit("welcome", `${socket.id}`)



    socket.on("disconnect", () => {
        if (list.length >= 2) {
            list.splice(0, 2)
        }
    })

    list.push(socket.id)

    io.emit("list", {
        list: list,
    })

    socket.on("start", (e) => {
        count += 1
        if (randomButtlet === count) {
            io.to(e.id).emit("resones", "You are dead")
            io.to(list.find((el) => el != e.id)).emit("win", "You win")
            count = 0
            return;

        }
        io.emit("playerId", {
            show: count,
            ids: e.id,
            rando: randomButtlet
        })
    })
})

app.get("/", (req, res) => {
    res.send("connected")
})


server.listen(3000, () => console.log("server stated"))
