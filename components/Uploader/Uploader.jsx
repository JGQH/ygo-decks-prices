import React, { useRef } from 'react'
import { useYdk } from '@Root'
import useFile from '@Hooks/useFile'
import { takeScreenshot, fetchPrices } from './UploaderAux'
import styles from './uploader.module.scss'

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
    <div className={styles.uploaderContainer}>
        <h1>YGO Decks Prices</h1>
        <div className={styles.uploaderTitle}>
            <p>Upload your YDK file</p>
        </div>
        <div className={styles.uploaderFile}>
            <button onClick={() => input.current?.click()}>{file ? file.name : 'Click here to upload'}</button>
            <input ref={input} type='file' onChange={pushFile} />
        </div>
        <div className={styles.uploaderSearcher}>
            <button disabled={!file} onClick={doFetch}>Search Data</button>
        </div>
        <div className={styles.uploaderCapture}>
            <button disabled={fetcher?.status !== 'FINISHED'} onClick={doScreenshot}>Capture Table</button>
        </div>
    </div>)
}