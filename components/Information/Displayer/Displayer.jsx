import { useYdk } from '@Root'
import Image from 'next/image'
import styles from './displayer.module.scss'

export default function Displayer() {
    const { display } = useYdk()

    return (
    <div className={styles.displayerContainer} onClick={() => display()}>
        <Image src='/displayer.svg' alt='Information' />
    </div>)
}