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
        if (!tmdbAccessToken) {
            console.error("---- env var missing")
            throw new Error("---- Unknwon error")
        }

        const url = req.body

        const response = await axios.get(url, { headers: { "Authorization": `Bearer ${tmdbAccessToken}` } })
        const json = response.data.results ? response.data.results : response.data
        res.status(200).json(json)
    } catch (error: any) {
        // 삭제 금지 삭제 금지 삭제 금지 삭제 금지 삭제 금지 
        console.error("Full error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        })
        // 삭제 금지 삭제 금지 삭제 금지 삭제 금지 삭제 금지       
        res.status(400).json({ message: "----ERROR OCCURRED!", error })
    }
})

const port = process.env.PORT || 3456
app.listen(port, () => console.log(`server is on port: ${port}`))