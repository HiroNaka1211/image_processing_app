import ProcessingType from "../components/ProcessingType";

export const startProcessing = async ({processingStyle,imageList}:processingProps):Promise<any>=> {
    try {
      const formData = new FormData();
      formData.append("processingStyle",processingStyle)
      
      //ファイル名の文字化けの対処として、エンコーディング
      imageList.map((image)=> {
        console.log(image);
        formData.append('images', image,encodeURIComponent(`${image.name}`));
      })
      // console.log(formData.getAll('images'));
      const res = await fetch("http://localhost:3001/upload",{
       method: 'POST',
        body: formData
      })
      if (!res.ok) {
        throw new Error(`HTTP error!: Status${res.status}`);
      }
      console.log(res);
      return;
    } catch (error) {
      console.log("エラーです。", error);
      return [];
    }
  };
