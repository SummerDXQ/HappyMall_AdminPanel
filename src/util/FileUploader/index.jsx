import React,{Component} from "react";
import FileUpload from './FileUpload';

class FileUploader extends Component{
    render(){
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType:'json',
            chooseAndUpload:true,
            uploadSuccess: (res) => this.props.onSuccess(res.data),
            uploadError: (res) => this.props.onError(res.message),
        }

        return (
            <FileUpload options={options}>
                <button className="btn" ref="chooseAndUpload">choose image</button>
            </FileUpload>
        )
    }
}

export default FileUploader;
