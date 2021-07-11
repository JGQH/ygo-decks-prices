import Uploader from '@Components/Uploader'
import Visualizer from '@Components/Visualizer'
import { useHandler } from '@Hooks/useHandler'
import React, { useContext, useRef } from 'react'

const YdkContext = React.createContext()

export function useYdk() {
    return useContext(YdkContext)
}

export default function Home() {
    const table = useRef(null)
    const [fetcher, dispatch] = useHandler()

    return (
    <YdkContext.Provider value={{fetcher, dispatch, table}}>
        <Uploader />
        <Visualizer />
    </YdkContext.Provider>)
}