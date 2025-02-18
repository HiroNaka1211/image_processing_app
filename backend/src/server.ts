import express from "express";
import multer from "multer";

const app: express.Application = express();
const port = 3001;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.post("/upload",upload.array("images"),(req:express.Request, res: express.Response) => {
    try {
        //frontendから受け取った、imagesがからではないことと、配列で受け取ったことを確認。
        if (!req.files || Array.isArray(req.files) === false) {
            return res.status(400).send('No files uploaded or files are not in expected format');
        }
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.status(201).send('HelloWorld')
        } catch (error) {
            console.error(error)
        }
//     console.log(req.body);  // 受け取ったデータをログに出力
//   res.status(200).json({ message: "データを受け取りました" }); 

});

app.listen(port, () => {
    console.log(`${port}でサーバ起動中`)
})