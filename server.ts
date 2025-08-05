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
    origin: ["http://localhost:5173"],
    methods: ["OPTIONS", "GET", "POST", "PATCH", "DELETE"]
}
app.use(cors(corsOptions))

app.post("/tmdb", async (req, res) => {
    const url = req.body
    const response = await axios.get(url, {headers: { "Authorization": `Bearer ${tmdbAccessToken}`}})
    const json = response.data.results ? response.data.results : response.data
    res.status(200).json(json)
})

app.get("/supabase/sign-up", (req, res) => { res.status(200).send("---- so far so good") })
app.get("/supabase/sign-in-with-email", (req, res) => { res.status(200).send("---- so far so good") })
app.get("/supabase/sign-out", (req, res) => { res.status(200).send("---- so far so good") })
app.get("/supabase/sign-in-with-provider", (req, res) => { res.status(200).send("---- so far so good") })
app.get("/supabase/get-user", (req, res) => { res.status(200).send("---- so far so good") })
app.get("/supabase/add-favorite", (req, res) => { res.status(200).send("---- so far so good") })
app.get("/supabase/delete-favorite", (req, res) => { res.status(200).send("---- so far so good") })

const port = process.env.PORT || 3456
app.listen(port, () => console.log(`server is on port: ${port}`))