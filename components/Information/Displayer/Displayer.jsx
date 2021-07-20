import { useYdk } from '@Root'
import Image from 'next/image'
import styles from './displayer.module.scss'
import icon from '@Public/displayer.svg'

export default function Displayer() {
    const { display } = useYdk()

    return (
    <div className={styles.displayerContainer} onClick={() => display()}>
        <Image src={icon} alt='Information' />
    </div>)
}