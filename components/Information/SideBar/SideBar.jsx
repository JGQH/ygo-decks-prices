import { useYdk } from '@Root'
import styles from './sidebar.module.scss'

export default function SideBar() {
    const { info } = useYdk()
    const className = info ? styles.sideBarShown : styles.sideBarHidden

    return (
    <div className={className}>
        <p>About</p>
    </div>)
}