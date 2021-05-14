const Uploader = ({file, setFile}) => {
    const onFileChange = evt => {
        const file = evt.target.files[0];
        if(file?.name.endsWith(".ydk")) {
            setFile(file);
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
            <input type="file" onChange={onFileChange} />
        </div>
        <div className="uploader-searcher">
            <button disabled={!file}>Search Data</button>
        </div>
    </div>)
}

export default Uploader