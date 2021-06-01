import { useState, useReducer } from 'react';

export const useToggle = (initialValue) => {
    const [toggle, setToggle] = useState(initialValue);

    const doToggle = () => {
        setToggle(!toggle);
    }

    return [toggle, doToggle];
}

/* Reducer */
function setReducer(_, action) {
    switch (action.status) {
        case 'DOWNLOADING':
        case 'UPLOADING':
        case 'ERROR':
        case 'FINISHED':
            return action;
        default:
            throw new Error("Unmatched status of fetching");
    }
}

export const useHandler = () => {
    const [fetcher, dispatcher] = useReducer(setReducer, {status:"IDLE"});

    const setFetcher = (status, value) => {
        dispatcher({status:status, value:value})
    }

    return [fetcher, setFetcher];
}