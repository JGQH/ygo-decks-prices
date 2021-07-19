import { useState } from 'react';

export default function useToggle(initialValue) {
    const [toggle, setToggle] = useState(initialValue)

    const doToggle = () => {
        setToggle(!toggle)
    }

    return [toggle, doToggle]
}