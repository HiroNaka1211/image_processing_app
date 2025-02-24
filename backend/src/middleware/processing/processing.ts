import express from "express";
import sharp from 'sharp';
import { FileType } from 'processing';


export default async function processing(req:express.Request, res: express.Response, next:express.NextFunction){
    //frontendから受け取った、imagesがからではないことと、配列で受け取ったことを確認。
    if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).send('No files uploaded or files are not in expected format');
    }
    let output: FileType[] = new Array();
    const files = req.files;
    const processing = req.body.processingStyle;
    
    //initialize array.
    req.body.editedPhoto = new Array();

    await blur(files);
    for(let i = 0; i < output.length; i ++){
        //  req.body.editedPhoto = output;
         req.body.editedPhoto.push(output[i]);
    }
    output = [];

    await grayscale(files);
    for(let i = 0; i < output.length; i ++){
        //  req.body.editedPhoto = output;
         req.body.editedPhoto.push(output[i]);
    }
    output = [];

    await circle(files);
    for(let i = 0; i < output.length; i ++){
        //  req.body.editedPhoto = output;
         req.body.editedPhoto.push(output[i]);
    }
    output = [];

    next();

    //関数宣言（functionを使うとホスティングされる。一方、関数式ではホスティングされない。
    async function blur (files:Express.Multer.File[]):Promise<void>{
        const processingStyle="BLUR";
        return new Promise((resolve,reject)=>{
            if(processing == processingStyle || processing == "ALL"){
            //     //配列に格納する際に使用。
            //     var p = 0;
            // if(processing == "ALL"){
            //     p = 0;
            // };

            console.log("++++++++Start Blur+++++++++");

            const promises = files.map(async (file, i)=>{
                //ファイル名をデコーディングし、新たなファイル名をプロセッシングタイプ名＋元のファイル名で作成
                var newFileName =processingStyle+"_"+decodeURIComponent(file.originalname);
                const image = sharp(file.buffer);
                let data = await image.blur(30).toBuffer();
                const val = {
                    fileName: encodeURIComponent(newFileName),
                    buffer: data
                }
                output.push(val);
            })
            Promise.all(promises)
            .then(() => {
                console.log("The BLUR processing was successful.")
                console.log("++++++++End Blur+++++++++")
                resolve()})
            .catch(reject);
        }else{
            resolve();
        }
        })
    }

    async function grayscale (files:Express.Multer.File[]):Promise<void>{
        const processingStyle="grayscale";
        return new Promise((resolve,reject)=>{
            if(processing == processingStyle || processing == "ALL"){
                //配列に格納する際に使用。
            //     var p = 0;
            // if(processing == "ALL"){
            //     p = 0;
            // };

            console.log("++++++++Start Grayscale+++++++++");

            const promises = files.map(async (file, i)=>{
                //ファイル名をデコーディングし、新たなファイル名をプロセッシングタイプ名＋元のファイル名で作成
                var newFileName =processingStyle+"_"+decodeURIComponent(file.originalname);
                const image = sharp(file.buffer);
                let data = await image.grayscale().toBuffer();
                const val = {
                    fileName: encodeURIComponent(newFileName),
                    buffer: data
                }
                output.push(val);
            })
            Promise.all(promises)
            .then(() => {
                console.log("The grayscale processing was successful.")
                console.log("++++++++End Grayscale+++++++++")
                resolve()})
            .catch(reject);
        }else{
            resolve();
        }
        })
    }

    async function circle (files:Express.Multer.File[]):Promise<void>{
        const processingStyle="circle";
        return new Promise((resolve,reject)=>{
            if(processing == processingStyle || processing == "ALL"){
                const width = 400;
                const r = width / 2;
                const circleShape = Buffer.from(`<svg><circle cx = "${r}" cy = "${r}" r = "${r}" /></svg>`)

                //配列に格納する際に使用。
            //     var p = 0;
            // if(processing == "ALL"){
            //     p = 0;
            // };

            console.log("++++++++Start Circle+++++++++");

            const promises = files.map(async (file, i)=>{
                //ファイル名をデコーディングし、新たなファイル名をプロセッシングタイプ名＋元のファイル名で作成
                var newFileName =processingStyle+"_"+decodeURIComponent(file.originalname);
                const image = sharp(file.buffer);
                let data = await image.resize(width,width).composite([{
                    input: circleShape,
                    blend: 'dest-in'
                }]).toBuffer();
                const val = {
                    fileName: encodeURIComponent(newFileName),
                    buffer: data
                }
                output.push(val);
            })
            Promise.all(promises)
            .then(() => {
                console.log("The circle processing was successful.")
                console.log("++++++++End Circle+++++++++")
                resolve()})
            .catch(reject);
        }else{
            resolve();
        }
        })
    }
}

