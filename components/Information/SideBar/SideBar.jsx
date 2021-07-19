import { useYdk } from '@Root'
import styles from './sidebar.module.scss'

const GithubRepo = 'https://github.com/JGQH'

export default function SideBar() {
    const { info, fetcher } = useYdk()
    const className = info ? styles.sideBarShown : styles.sideBarHidden

    const errors = fetcher?.value?.errors || []

    return (
    <div className={className}>
        <div className={styles.sideItem}>
            <div className={styles.sideItemTitle}>
                <h1>About</h1>
            </div>
            <div className={styles.sideItemContent}>
                <p>This website was created by <a href={GithubRepo} target='_blank'>@JGQH</a>, using NextJS and an API written in TypeScript</p>
                <p>It aims to be an easy and fast solution to pricing a deck you've been building. Rather than searching price by price, simply upload your .ydk file (Obtained from EDOPRO or downloaded from YGOPRODECK) and let the code do your job!</p>
            </div>
        </div>
        <div className={styles.sideItem}>
            <div className={styles.sideItemTitle}>
                <h1>Errors</h1>
            </div>
            <div className={styles.sideItemContent}>
                <p>Here will appear a list of errors that ocurred from pricing your .ydk file</p>
                <p>Errors found: {errors.length}</p>
                {errors.length > 0 && (
                errors.map((msg, i) => (
                    <p key={i}>-{msg}</p>
                )))}
            </div>
        </div>
    </div>)
}