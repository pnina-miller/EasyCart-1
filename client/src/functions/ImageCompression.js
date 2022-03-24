import imageCompression from "browser-image-compression";
import axios from "axios";

async function Compression(imageFile) {
  let imgUrl = "";
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    const formData = new FormData();
    formData.append("file", compressedFile, compressedFile.name);
    const userName = "RutSagron"
    const jwtFromCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtbkRBWEdYSW80TVlLVWxzY01xZnNyblN5NDMzIiwiZW1haWwiOiJydXRzYWdyb25AbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIzMTQxNjc4fQ.9av77Us5qX598DGC8e6BT_vhz5B62tEzukz3YhJXoH8"
    const response = await axios({
      method: "post",
      url: `https://files.codes/api/${userName}/upload`,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': jwtFromCookie
      }
    })
    imgUrl = response.data.data.url
    return imgUrl
  }
  catch (err) {
    console.error("err", err);
  }

} export default Compression;







