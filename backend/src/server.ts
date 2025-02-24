import express from "express";
import processing from "./middleware/processing/processing";
import multer from "multer";
import  base64Coversion  from "./middleware/base64Conversion";

const app: express.Application = express();
const port = 3001;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.post("/upload",upload.array("images"),processing, base64Coversion,(req:express.Request, res: express.Response) => {
    try {
        //frontendから受け取った、imagesがからではないことと、配列で受け取ったことを確認。
        if (!req.files || Array.isArray(req.files) === false) {
            return res.status(400).send('No files uploaded or files are not in expected format');
        }
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        console.log(JSON.stringify({files:req.body.editedPhoto}))
            res.status(201).send(JSON.stringify({files:req.body.editedPhoto}));
        } catch (error) {
            console.error(error)
        }
//     console.log(req.body);  // 受け取ったデータをログに出力
//   res.status(200).json({ message: "データを受け取りました" }); 

});

app.listen(port, () => {
    console.log(`${port}でサーバ起動中`)
})