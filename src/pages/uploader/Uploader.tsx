import { ChangeEvent } from "react";

const Uploader = () => {

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files && e.target.files[0]
    const fileReader = new FileReader()
    if (file) {
      fileReader.readAsArrayBuffer(file)
    }
    fileReader.onload = e => {
      console.log(e.target?.result as ArrayBuffer);
    }
  }

  return (
    <input type="file" onChange={handleFileUpload}  />
  )
}

export default Uploader