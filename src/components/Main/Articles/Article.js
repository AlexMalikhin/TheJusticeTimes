import {useCallback} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import viewsImg from "../../../img/viewsImg.png";
import styles from './Article.module.css';

const Article = ({id, img, firstname, lastname, avatar, views, header, paragraph, month, day, minutes, tags}) => {
    const navigate = useNavigate();
    const showFullArticle = useCallback((id) => {
        navigate(`./${id}`, {replace: true})
    }, []);

    return (
        <div onClick={() => showFullArticle(id)} className={styles.articles}>
            <img src={img} className={styles.img_article}/>
            <div className={styles.article_block}>
                <ul>
                    <li className={styles.hashtags}><a>{tags}</a></li>
                </ul>
                <h2>{header}</h2>
                <p className={styles.paragraph_short}>{paragraph}</p>
                <div className={styles.article_info}>
                    <div className={styles.avatar_block}>
                        <img src={avatar} className={styles.avatars}/>
                        <span className={styles.avatar_name}>{firstname} {lastname}</span>
                    </div>
                    <div className={styles.m8}>
                        <span>{month} {day} · {minutes}</span>
                    </div>
                    <div className={styles.ml8}>
                        <img src={viewsImg} className={styles.views}/>
                        <span className={styles.ml8}>{views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;