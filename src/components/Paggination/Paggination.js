import {useCallback} from "react";
import {Button} from '../Button/Button';
import {articles} from '../../mockStore/articles';
import buttonStyles from '../Button/Button.module.css';
import styles from "./Paggination.module.css";


export const Paggination = ({setPage, page, allArticles}) => {

    const prevPage = useCallback(() => {
        setPage((page) => (page === 0) ? 0 : page - 1);
    }, [page]);
    const nextPage = useCallback(() => {
        setPage((page) => page + 1);
    }, [page]);
    return (
        <div className={styles.paggination}>
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
                disable={page * 11 > allArticles.length}
            >
                Next
            </Button>
        </div>
    );
}