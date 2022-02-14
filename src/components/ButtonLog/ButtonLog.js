export const ButtonLog = ({title, style, click, disable}) =>{
    return(
        <button
            onClick={click}
            className={style}
            disabled={disable}
        >{title}</button>
    );
}