import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../AppContext/AppContext';
import styles from './MyArticle.module.css';

import views from '../../img/viewsImg.png';


export const MyArticle = (props) => {
    const navigate = useNavigate();
    const showFullArticle = () =>{
        navigate(`./${props.props.id}`, {replace: true})
    }

    return (
        <div onClick={showFullArticle} className={styles.articles}>
            <img src={props.props.headImg} className={styles.img_article} />
            <div className={styles.article_block}>
                <ul>
                    <li className={styles.hashtags}>{props.props.category}</li>
                </ul>
                <h2>{props.props.title}</h2>
                <p className={styles.short}>{props.props.text}</p>
                <div className={styles.article_info}>
                    <div className={styles.avatar_block}>
                        <img src={props.props.avatar} className={styles.avatars} />
                        <span className={styles.avatar_name}>{props.props.firstname} {props.props.lastname}</span>
                    </div>
                    <div className={styles.m8}>
                        <span>{props.props.monthOfCreated} {props.props.dayOfCreated} · {props.props.timeOfCreated}</span>
                    </div>
                    <div className={styles.ml8}>
                        <img src={views} className={styles.views} />
                        <span className={styles.ml8}>{props.props.views}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}