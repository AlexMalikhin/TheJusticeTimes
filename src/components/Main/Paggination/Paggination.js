import {articles} from "../../../mockStore/articles";

export const Paggination = ({setPage, page}) =>{

    const prevPage = () =>{
        setPage((page)=>(page === 0) ? 0 : page - 6);
    }
    const nextPage = () =>{

        console.log(articles.length);
        setPage((page)=>page + 6);
    }
    return(
        <>
            <div className='paggination'>
                <button
                    onClick={prevPage}
                    className='paggination-button'
                    disabled={page === 0 ? true : false}
                >Prev
                </button>
                <button
                    onClick={nextPage}
                    className='paggination-button'
                    disabled={page + 12 > articles.length ? true : false}
                >Next
                </button>
            </div>
        </>
    );
}