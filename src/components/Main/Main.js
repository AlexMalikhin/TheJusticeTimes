import {articles} from "../../mockStore/articles";
import Article from "./Articles/Article";
import {Paggination} from "./Paggination/Paggination";
import {useContext, useMemo} from 'react';
import {AppContext} from "../AppContext/AppContext";

export const Main = () =>{
    const{currentPage, setCurrentPage } = useContext(AppContext);
    const slicedArticles = useMemo(() => articles.slice(currentPage * 6, currentPage * 6 + 6),[currentPage])
    console.log(slicedArticles)
    return(
        <>
            <div className='main-container'>
                <div className='main-content'>
                    <h1>Popular articles</h1>
                    {slicedArticles.map((article=>
                        <Article
                            id={article.key}
                            key={article.key}
                            img={article.img}
                            author={article.author}
                            avatar={article.avatar}
                            views={article.views}
                            header={article.header}
                            paragraph={article.paragraph}
                            month={article.month}
                            day={article.day}
                            readed={article.day}
                            tags={article.hashtags}
                        />))}
                    <Paggination
                        setPage={setCurrentPage}
                        page={currentPage}
                    />
                </div>
            </div>
        </>
    );
}