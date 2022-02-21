import styles from './TopArticle.module.css';
import topArticle from "../../img/article_images/1.png";
import janayWright from "../../img/avatars/JanayWright.png";
import views from "../../img/viewsImg.png";

export const TopArticle = ({props}) => {
    return (
        <div className={styles.top_article}>
            <img src={props?.headImg} className={styles.img_article}/>
            <div className={styles.top_article_block}>
                <a className={styles.hashtags}>{props?.category}</a>
                <h2>{props?.title}</h2>
                <p>
                    {props?.text}
                </p>
                <div className={styles.bottom_block}>
                    <div className={styles.avatar_block}>
                        <img src={props?.avatar} className={styles.avatars} />
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