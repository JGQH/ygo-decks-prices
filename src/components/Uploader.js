import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const Uploader = props => {
    const { getYdkPrice, isShowing, refTable } = props;

    const [file, setFile] = useState(null);
    const input = useRef(null);

    const onFileChange = evt => {
        const uploaded = evt.target.files[0];
        if(uploaded?.name.endsWith(".ydk")) {
            setFile(uploaded);
        }else{
            setFile(null);
        }
    }

    const onTableScreenshot = async () => {
        try {
            const dataUrl = await toPng(refTable.current);
            download(dataUrl, "YDK Prices");
        } catch (error) {
            alert(error.toString());
        }
    }

    return (
    <>
        <div className="uploader-title">
            <p>Upload your YDK file</p>
        </div>
        <div className="uploader-file">
            <button onClick={() => input.current?.click()}>{file ? file.name : "Click here to upload"}</button>
            <input ref={input} type="file" onChange={onFileChange} />
        </div>
        <div className="uploader-searcher">
            <button disabled={!file} onClick={() => getYdkPrice(file)}>Search Data</button>
        </div>
        <div className="uploader-capture">
            <button disabled={!isShowing} onClick={onTableScreenshot}>Capture Table</button>
        </div>
    </>)
}

export default Uploader