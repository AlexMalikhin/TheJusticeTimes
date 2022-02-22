import {useCallback} from "react";
import {Button} from '../Button/Button';
import buttonStyles from '../Button/Button.module.css';


export const Paggination = ({setPage, page, allArticles, style, length}) => {
    console.log(allArticles);
    const prevPage = useCallback(() => {
        setPage((page) => (page === 0) ? 0 : page - 1);
    }, [page]);
    const nextPage = useCallback(() => {
        setPage((page) => page + 1);
    }, [page]);
    const getResult = () =>{
        if(page === 0){
            return page + length >= allArticles.length
        }
        return (page + 1) * length - 1 >= allArticles.length
    }
    console.log(page * length < allArticles.length);

    return (
        <div className={style}>
            <Button
                click={prevPage}
                style={buttonStyles.header_logIn}
                title='Prev'
                disable={page === 0}
            >
                Prev
            </Button>
            <Button
                click={nextPage}
                style={buttonStyles.header_logIn}
                title='Next'
                disable={getResult()}
            >
                Next
            </Button>
        </div>
    );
}