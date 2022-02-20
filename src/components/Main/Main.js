import {useContext, useMemo} from 'react';
import Article from "./Articles/Article";
import {Paggination} from '../Paggination/Paggination';
import {TopArticle} from "../TopArticle/TopArticle";
import {AppContext} from "../AppContext/AppContext";
import {articles} from "../../mockStore/articles";
import styles from './Main.module.css';

export const Main = () => {
    const {currentPage, setCurrentPage, allArticles, profileAvatar} = useContext(AppContext);
    const slicedArticles = useMemo(() => allArticles.slice(currentPage * 6, currentPage * 6 + 6), [currentPage, allArticles])
    return (
        <div className={styles.main_container}>
            <TopArticle/>
            <div className={styles.main_content}>
                <h1>Popular articles</h1>
                {slicedArticles.map((article =>
                    <Article
                    //     id: Math.random().toString(36).substr(2, 13),
                    // userId: authKey,
                    // title: newArticleTitle,
                    // category: newArticleCategory,
                    // headImg: imgNewArticle,
                    // monthOfCreated: getMonth(),
                    // dayOfCreated: getDay(),
                    // timeOfCreated: getTimePublication(),
                    // text: editorState.getCurrentContent().getPlainText(),
                    // views: 0,
                        id={article.id}
                        key={article.id}
                        img={article.headImg}
                        firstname={article.firstname}
                        lastname={article.lastname}
                        avatar={article.avatar}
                        views={article.views}
                        header={article.title}
                        paragraph={article.text}
                        month={article.monthOfCreated}
                        day={article.dayOfCreated}
                        minutes={article.timeOfCreated}
                        tags={article.category}
                    />))}
                <Paggination
                    setPage={setCurrentPage}
                    page={currentPage}
                    allArticles={allArticles}
                />
            </div>
        </div>
    );
}