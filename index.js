const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const weather = {
            city: data.name,
            temp: data.main.temp,
            desc: data.weather[0].description,
            humidity: data.main.humidity,
            wind: data.wind.speed
        };
        res.render("index", { weather, error: null });
    } catch (err) {
        res.render("index", { weather: null, error: "City not found!" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
