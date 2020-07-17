import React,{Component} from "react";
import FileUpload from './FileUpload';

class FileUploader extends Component{
    render(){
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType:'json',
            chooseAndUpload:true,
            uploadSuccess:(res)=>{
                console.log(res)
            },
            uploadError:(err)=>{
                console.log(err)
            },
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">choose image</button>
            </FileUpload>
        )
    }
}

export default FileUploader;
