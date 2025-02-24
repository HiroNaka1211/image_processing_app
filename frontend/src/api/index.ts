import ProcessingType from "../components/ProcessingType";

export const startProcessing = async ({processingStyle,imageList}:processingProps):Promise<any>=> {
    try {
      const formData = new FormData();
      formData.append("processingStyle",processingStyle)
      
      //ファイル名の文字化けの対処として、エンコーディング
      imageList.map((image)=> {
        // console.log(image);
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
      const data = await res.json();
      const files = data.files;
      // console.log(decodeURIComponent(files[0].fileName));
      // console.log(files[0].buffer)
      return files;
    } catch (error) {
      console.log("エラーです。", error);
      return [];
    }
  };
