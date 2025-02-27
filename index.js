const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const app = express()

// server requirement
const prometheus = require('prom-client');
const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 1, 2, 5, 10],
});

// middleware
app.use(express.json())
app.use(cors());

// env
dotenv.config();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((x) => {
        console.log("Connect to DB");
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err);
    });

app.use("/api/", require("./routes/router"));

// server requirement
app.use((req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        httpRequestDurationMicroseconds
            .labels(req.method, req.url, res.statusCode)
            .observe(durationInMilliseconds / 1000);
    });
    next();
});

function getDurationInMilliseconds(start) {
    return start[0] * 1000 + start[1] / 1000000;
}

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.send( await prometheus.register.metrics());
});

app.get('/healthz', async (req, res) => {
    res.send({status: "running"});
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
