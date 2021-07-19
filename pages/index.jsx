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
    const [fetcher, dispatch] = useHandler()
    const [info, display] = useToggle()

    return (
    <YdkContext.Provider value={{fetcher, dispatch, info, display, table}}>
        <Uploader />
        <Visualizer />
        <Displayer />
        <SideBar />
    </YdkContext.Provider>)
}