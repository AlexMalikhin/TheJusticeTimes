import {useCallback} from "react";
import {ButtonLog} from '../ButtonLog/ButtonLog';
import {articles} from '../../mockStore/articles';
import buttonStyles from '../ButtonLog/ButtonLog.module.css';
import styles from "./Paggination.module.css";


export const Paggination = ({setPage, page}) => {

    const prevPage = useCallback(() => {
        setPage((page) => (page === 0) ? 0 : page - 1);
    }, [page]);
    const nextPage = useCallback(() => {
        setPage((page) => page + 1);
    }, [page]);
    return (
        <div className={styles.paggination}>
            <ButtonLog
                click={prevPage}
                style={buttonStyles.header_logIn}
                title='Prev'
                disable={page === 0}
            >
                Prev
            </ButtonLog>
            <ButtonLog
                click={nextPage}
                style={buttonStyles.header_logIn}
                title='Next'
                disable={page * 11 > articles.length}
            >
                Next
            </ButtonLog>
        </div>
    );
}