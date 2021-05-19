import { useRef } from 'react';

const Uploader = ({file, setFile, getData}) => {
    const input = useRef(null);
    const onFileChange = evt => {
        const uploaded = evt.target.files[0];
        if(uploaded?.name.endsWith(".ydk")) {
            setFile(uploaded);
        }else{
            setFile(null);
        }
    }

    return (
    <div className="uploader-container">
        <div className="uploader-title">
            <p>Upload your YDK file</p>
        </div>
        <div className="uploader-file">
            <button onClick={() => input.current?.click()}>{file ? file.name : "Click here to upload"}</button>
            <input ref={input} type="file" onChange={onFileChange} />
        </div>
        <div className="uploader-searcher">
            <button disabled={!file} onClick={getData}>Search Data</button>
        </div>
    </div>)
}

export default Uploader