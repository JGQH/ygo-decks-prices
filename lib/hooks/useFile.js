import { useState } from 'react'

export default function useFile() {
    const [file, setFile] = useState(null)

    function pushFile(evt) {
        const uploaded = evt.target.files[0]
        if(uploaded?.name.endsWith('.ydk')) {
            setFile(uploaded)
            return
        }
        setFile(null);
    }

    return [file, pushFile]
}