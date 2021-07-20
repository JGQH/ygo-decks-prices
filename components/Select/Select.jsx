import useToggle from '@Hooks/useToggle'
import styles from './select.module.scss'

export default function Select({ options, value, onChange }) {
    const [isVisible, toggleVisibility] = useToggle()

    function doChange(index) {
        toggleVisibility()
        onChange(index)
    }

    return (
    <div className={styles.select}>
        <div className={styles.selectVisual}>
            <div className={styles.selectChosen}>
                {options[value]}
            </div>
            <div className={styles.selectToggler} onClick={() => toggleVisibility()}>
                {isVisible ? '▲' : '▼'}
            </div>
        </div>
        <div className={`${styles.selectOptions} ${isVisible ? styles.Visible : styles.Invisible}`}>
            {options.map((option, i) => (
                <div key={i} className={styles.selectOption} onClick={() => doChange(i)}>
                    {(i === value) ? <b>{option}</b> : option}
                </div>
            ))}
        </div>
    </div>)
}