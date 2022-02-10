import {articles} from "../../../mockStore/articles";
import {useCallback} from "react";

export const Paggination = ({setPage, page}) =>{

    const prevPage = useCallback(() =>{
        setPage((page)=>(page === 0) ? 0 : page - 1);
    },[page]);
    const nextPage = useCallback(() =>{
        setPage((page)=>page + 1);
    },[page]);
    return(
        <>
            <div className='paggination'>
                <button
                    onClick={prevPage}
                    className='paggination-button'
                    disabled={page === 0}
                >Prev
                </button>
                <button
                    onClick={nextPage}
                    className='paggination-button'
                    disabled={page * 13 > articles.length}
                >Next
                </button>
            </div>
        </>
    );
}