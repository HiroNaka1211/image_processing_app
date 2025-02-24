import { FileType } from "processing";


import express from "express";
//base64にした画像をフロントエンドに返す。
export default function base64Coversion(req:express.Request, res: express.Response, next:express.NextFunction){
    // return new Promise((resolve, reject)=>{
    //     resolve();
    // })

    const resp = req.body.editedPhoto.map((photo : FileType) => {
        const photoBase64 = photo.buffer.toString('base64')
        return {
            fileName: photo.fileName,
            buffer: photoBase64
        }
    })
    req.body.editedPhoto = resp;
    console.log(req.body.editedPhoto.length)
    next();
}