import { useYdk } from '@Root'
import { default as file } from './sidebarAux'
import { fetchPrices } from '@Components/UploaderAux'
import styles from './sidebar.module.scss'

const GithubRepo = 'https://github.com/JGQH'
const YuGiOhPrices = 'https://yugiohprices.com'

export default function SideBar() {
    const { info, display, fetcher, dispatch } = useYdk()
    const className = info ? styles.sideBarShown : styles.sideBarHidden

    const errors = fetcher?.value?.errors || []

    function loadTest() {
        display()
        fetchPrices(file, dispatch)
    }

    return (
    <div className={className}>
        <div className={styles.sideItem}>
            <div className={styles.sideItemTitle}>
                <h1>About</h1>
            </div>
            <div className={styles.sideItemContent}>
                <p>This website was created by <a href={GithubRepo} target='_blank'>@JGQH</a>, using NextJS and an API written in TypeScript.</p>
                <p>It aims to be an easy and fast solution to pricing a deck you've been building. Rather than searching price by price, simply upload your .ydk file (Obtained from EDOPRO or downloaded from YGOPRODECK) and let the code do your job!</p>
                <p>If you just want to test the website without a proper .ydk file, simply <span onClick={loadTest}>click here.</span></p>
            </div>
        </div>
        <div className={styles.sideItem}>
            <div className={styles.sideItemTitle}>
                <h1>How to use</h1>
            </div>
            <div className={styles.sideItemContent}>
                <p>First, click the button <i>Click here to upload</i> and search for your .ydk file.</p>
                <p>Then, the button <i>Search Data</i> should be available, so click it and wait for the prices to load.</p>
                <p>Once the prices appear, this sidebar will appear again. Check the section below to read if there were any errors with the prices.</p>
                <p>After that, you can click on the arrows in the <i>Set</i> column to select the set where the cards come from.</p>
                <p>Next, you can check the list of prices for the card in <i>Unit Price</i>. All the prices were obtained from <a href={YuGiOhPrices} target='_blank'>YuGiOh Prices</a>.</p>
                <p>Finally, if you want to save the current price table (Maybe for selling your deck), just click on <i>Capture Table</i> to download an image of the prices.</p>
            </div>
        </div>
        <div className={styles.sideItem}>
            <div className={styles.sideItemTitle}>
                <h1>Errors</h1>
            </div>
            <div className={styles.sideItemContent}>
                <p>Here will appear a list of errors that ocurred from pricing your .ydk file</p>
                <p>Errors found: {errors.length}</p>
                {errors.map((msg, i) => (
                    <p key={i}>-{msg}</p>
                ))}
            </div>
        </div>
    </div>)
}