import {useContext, useMemo, useEffect} from 'react';
import axios from 'axios';
import Article from "./Articles/Article";
import {Paggination} from '../Paggination/Paggination';
import {TopArticle} from "../TopArticle/TopArticle";
import {AppContext} from "../AppContext/AppContext";
import pagginationStyles from "../Paggination/Paggination.module.css";
import styles from './Main.module.css';

export const Main = () => {

    const {currentPage, setCurrentPage, allArticles, setAllArticles, authKey} = useContext(AppContext);
    useEffect(async ()=>{
        try{
            const all = await axios.get('http://localhost:5001/auth/getAllArticles')
            console.log(all);
        }catch (e) {
            console.log('dont get')
        }
    }, [])
    const slicedArticles = useMemo(() => allArticles.slice(currentPage * 6, currentPage * 6 + 6), [currentPage, allArticles])
    const viewArticle = (id) => {
        const othersArticles = allArticles.filter(article => article.id !== id)
        const myArticle = allArticles.find(article => article.id === id)
        const changedMyArticle = {
            ...myArticle,
            views: myArticle.views + 1
        }
        const newArticles = [...othersArticles, changedMyArticle]
        setAllArticles(newArticles);
        localStorage.setItem('articles', JSON.stringify(newArticles));
    }
    const mostPopularArticle = useMemo(() => {
        if (allArticles.length > 0) {
            return allArticles?.reduce((acc, cur) => acc.views > cur.views ? acc : cur)
        }
    }, [allArticles])


    return (
        <div className={styles.main_container}>
            <TopArticle props={mostPopularArticle}/>
            <div className={styles.main_content}>
                <h1>Popular articles</h1>
                {slicedArticles.map((article =>
                    <Article
                        id={article.id}
                        key={article._id}
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
                        viewArticle={viewArticle}
                    />))}
                <Paggination
                    setPage={setCurrentPage}
                    page={currentPage}
                    allArticles={allArticles}
                    style={pagginationStyles.allArticles}
                    length={6}
                />
            </div>
        </div>
    );

}