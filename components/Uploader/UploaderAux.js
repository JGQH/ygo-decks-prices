import { ydkParse } from '@Library/homeAux';
import axios from 'axios';
import download from 'downloadjs';
import { toPng } from 'html-to-image';

export async function takeScreenshot(table) {
    try {
        const dataUrl = await toPng(table)
        download(dataUrl, 'ydk_prices')
    } catch (error) {
        alert(error.toString())
    }
}

export async function fetchPrices(file, dispatch) {
    try {
        dispatch('UPLOADING', 0)
        const ydk = {
            data: await ydkParse(file)
        }
    
        const request = await axios.post('/api/pricer', ydk, {
            headers: {'Content-Type':'application/json'},
    
            onUploadProgress: evt => {
              const pCompleted = Math.floor(100 * evt.loaded / evt.total);
              dispatch('UPLOADING', pCompleted)
            },
    
            onDownloadProgress: evt => {
              const pCompleted = Math.floor(100 * evt.loaded / evt.total);
              dispatch('DOWNLOADING', pCompleted)
            }
        })

        const data = request.data;
        
        if(request.status !== 200) {
            throw new Error(data['data']);
        }

        if(data['errors'].length > 0) {
            const errors = data['errors'].map(msg => `- ${msg}`)
            alert('Errors found in ydk:\n' + errors.join("\n"))
        }

        dispatch('FINISHED', data['ydk']);
    } catch (error) {
        dispatch('ERROR', error.message);
    }
}