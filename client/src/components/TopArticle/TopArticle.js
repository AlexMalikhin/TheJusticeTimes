import {useNavigate} from 'react-router-dom';
import styles from './TopArticle.module.css';
import views from "../../img/viewsImg.png";
import defaultAvatar from "../../img/defaultAvatar.png";

export const TopArticle = ({props}) => {
    const navigate = useNavigate();
    const showFullArticle = () =>{
        navigate(`/AllArticles/${props.id}`)
    }
    return (
        <div onClick={showFullArticle} className={styles.top_article}>
            <img src={props?.headImg} className={styles.img_article}/>
            <div className={styles.top_article_block}>
                <a className={styles.hashtags}>{props?.category}</a>
                <h2>{props?.title}</h2>
                <p>
                    {props?.text}
                </p>
                <div className={styles.bottom_block}>
                    <div className={styles.avatar_block}>
                        <img src={props?.avatar ? props?.avatar : defaultAvatar} className={styles.avatars} />
                        <span className={styles.avatar_name}>{props?.firstname} {props?.lastname}</span>
                    </div>
                    <div className={styles.m8}>
                        <span>{props?.monthOfCreated} {props?.dayOfCreated} · {props?.timeOfCreated}</span>
                    </div>
                    <div className={styles.m8}>
                        <img src={views} className={styles.views}/>
                        <span className={styles.ml8}>{props?.views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}