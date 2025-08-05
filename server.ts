import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import axios from "axios"
dotenv.config()

const tmdbAccessToken = process.env.TMDB_READ_ACCESS_TOKEN

const app = express()
app.use(express.json())
app.use(express.text())

const corsOptions: cors.CorsOptions = {
    origin: ["http://localhost:5173", "https://oz-play.vercel.app"],
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
}
app.use(cors(corsOptions))

app.get("/", (req, res) => res.send("Welcome!"))

app.post("/tmdb", async (req, res) => {
    try {
        const url = req.body
        
        const response = await axios.get(url, { headers: { "Authorization": `Bearer ${tmdbAccessToken}` } })
        const json = response.data.results ? response.data.results : response.data
        res.status(200).json(json)
    } catch (error: any) {
        res.status(400).json({message: "----ERROR OCCURRED!", error})
    }
})

const port = process.env.PORT || 3456
app.listen(port, () => console.log(`server is on port: ${port}`))