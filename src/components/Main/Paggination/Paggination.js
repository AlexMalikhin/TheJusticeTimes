import {useCallback} from "react";
import {articles} from "../../../mockStore/articles";
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
            <button
                onClick={prevPage}
                className={styles.paggination_button}
                disabled={page === 0}
            >Prev
            </button>
            <button
                onClick={nextPage}
                className={styles.paggination_button}
                disabled={page * 11 > articles.length}
            >Next
            </button>
        </div>
    );
}