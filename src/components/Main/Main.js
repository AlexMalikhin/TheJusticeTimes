import {articles} from "../../mockStore/articles";
import Article from "./Articles/Article";

export const Main = () =>{
    return(
        <>
            <div className='main-container'>
                <div className='main-content'>
                    <h1>Popular articles</h1>
                    {articles.map((article=>
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
                    <div className='paggination'>
                        <button className='paggination-button' disabled={true}>Prev</button>
                        <button className='paggination-button'>Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}