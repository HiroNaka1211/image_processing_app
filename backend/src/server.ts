import express from "express";

const app: express.Application = express();
const port = 3001;

app.get("/", (req:express.Request, res: express.Response) => {res.send("Hello World!")});

app.listen(port, () => {
    console.log(`${port}でサーバ起動中`)
})