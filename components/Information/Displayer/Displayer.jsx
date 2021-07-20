import { useYdk } from '@Root'
import styles from './displayer.module.scss'

export default function Displayer() {
    const { display } = useYdk()

    return (
    <div className={styles.displayerContainer} onClick={() => display()}>
        <img src='/displayer.svg' alt='Information' />
    </div>)
}