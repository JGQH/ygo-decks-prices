import React, { useRef } from 'react'
import { useYdk } from '@Root'
import useFile from '@Hooks/useFile'
import { takeScreenshot, fetchPrices } from './UploaderAux'

export default function Uploader() {
    const input = useRef(null)
    const { fetcher, dispatch, table } = useYdk()
    const [file, pushFile] = useFile()

    function doFetch() {
        fetchPrices(file, dispatch)
    }
    function doScreenshot() {
        takeScreenshot(table.current)
    }

    return (
    <div className='uploader-container'>
        <h1>YGO Decks Prices</h1>
        <div className='uploader-title'>
            <p>Upload your YDK file</p>
        </div>
        <div className='uploader-file'>
            <button onClick={() => input.current?.click()}>{file ? file.name : 'Click here to upload'}</button>
            <input ref={input} type='file' onChange={pushFile} />
        </div>
        <div className='uploader-searcher'>
            <button disabled={!file} onClick={doFetch}>Search Data</button>
        </div>
        <div className='uploader-capture'>
            <button disabled={fetcher?.status !== 'FINISHED'} onClick={doScreenshot}>Capture Table</button>
        </div>
    </div>)
}