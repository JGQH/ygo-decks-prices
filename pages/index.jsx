import Uploader from '@Components/Uploader'
import Visualizer from '@Components/Visualizer'
import Displayer from '@Components/Displayer'
import SideBar from '@Components/SideBar'
import useHandler from '@Hooks/useHandler'
import useToggle from '@Hooks/useToggle'
import React, { useContext, useRef } from 'react'

const YdkContext = React.createContext()

export function useYdk() {
    return useContext(YdkContext)
}

export default function Home() {
    const table = useRef(null)
    const [fetcher, setFetcher] = useHandler()
    const [info, display] = useToggle(false)

    function dispatch(status, value) {
        setFetcher(status, value)
        
        if(status === 'FINISHED') {
            display(true) //To display the error section in the sidebar
        }
    }

    return (
    <YdkContext.Provider value={{fetcher, dispatch, info, display, table}}>
        <Uploader />
        <Visualizer />
        <Displayer />
        <SideBar />
    </YdkContext.Provider>)
}