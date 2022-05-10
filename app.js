import express from "express";
import routesFilms from './routes/films.routes.js'

const app=express()
app.use(express.json());

app.use("/api",routesFilms)

export default app