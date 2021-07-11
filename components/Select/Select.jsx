import useToggle from '@Hooks/useToggle'

export default function Select({ options, value, onChange }) {
    const [isVisible, toggleVisibility] = useToggle()

    function doChange(index) {
        toggleVisibility()
        onChange(index)
    }

    return (
    <div className='table-select'>
        <div className='table-visual'>
            <div className='table-selected'>
                {options[value]}
            </div>
            <div className='table-toggler' onClick={toggleVisibility}>
                {isVisible ? '▲' : '▼'}
            </div>
        </div>
        <div className={`table-selector table-${isVisible ? 'visible' : 'invisible'}`}>
            {options.map((option, i) => (
                <div key={i} className='table-option' onClick={() => doChange(i)}>
                    {(i === value) ? <b>{option}</b> : option}
                </div>
            ))}
        </div>
    </div>)
}