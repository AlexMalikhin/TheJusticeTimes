import inputStyles from './Input.module.css';

export const Input = ({name, placeholder, label, type, inputValue, changeValue, isRenderError, blurHandle, errorText, focusEvent}) =>{
    const setValue = (e) =>{
       changeValue(value=> value = e.target.value)
    };

    return(
        <div className={inputStyles.input_block}>
            <label htmlFor={name} className={inputStyles.label}>{label}</label>
            <input
                onChange={setValue}
                value={inputValue}
                name={name}
                placeholder={placeholder}
                onBlur={blurHandle}
                className={inputStyles.input}
                type={type}
                onFocus={focusEvent}
            />
            {isRenderError && <p className={inputStyles.error}>{errorText}</p>}
        </div>
    )
}