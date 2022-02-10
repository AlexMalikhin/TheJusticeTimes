import {articles} from "../../mockStore/articles";
import Article from "./Articles/Article";
import {Paggination} from "./Paggination/Paggination";
import {useContext} from 'react';
import {AppContext} from "../AppContext/AppContext";

export const Main = () =>{
    const{currentPage, setCurrentPage} = useContext(AppContext);
    console.log(currentPage, currentPage + 5);
    return(
        <>
            <div className='main-container'>
                <div className='main-content'>
                    <h1>Popular articles</h1>
                    {articles.slice(currentPage, currentPage + 6).map((article=>
                        <Article
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