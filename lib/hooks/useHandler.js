import { useReducer } from 'react'

function setReducer(_, action) {
    switch (action.status) {
        case 'DOWNLOADING':
        case 'UPLOADING':
        case 'ERROR':
        case 'FINISHED':
            return action
        default:
            throw new Error('Unmatched status of fetching')
    }
}

export default function useHandler() {
    const [fetcher, dispatcher] = useReducer(setReducer, { status:'IDLE' })

    const setFetcher = (status, value) => {
        dispatcher({ status, value })
    }

    return [fetcher, setFetcher]
}