import { useState } from 'react';

export default function useToggle(initialValue) {
    const [toggle, setToggle] = useState(initialValue)

    const doToggle = (forced) => {
        if(forced !== undefined) { //To force a new state when required
            setToggle(forced)
            return
        }
        setToggle(!toggle)
    }

    return [toggle, doToggle]
}