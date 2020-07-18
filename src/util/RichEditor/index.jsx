import React,{Component} from "react";
import $ from 'jquery';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';

class RichEditor extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadEditor();
    }

    loadEditor = () => {
        let element = this.textarea;
        this.simditor = new Simditor({
            textarea : $(element),
            defaultValue : this.props.placeholder || 'please input content',
            upload : {
                url:'/manage/product/richtext_img_upload.do',
                defaultImage:'',
                fileKey:'upload_file'
            }
        })
        this.bindEditorEvent();
    }

    bindEditorEvent = () => {
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue())
        })
    }

    render() {
        return (
            <div className="rich-editor">
                <textarea
                    ref={textarea => this.textarea = textarea}
                />
            </div>
        );
    }
}

export default RichEditor;