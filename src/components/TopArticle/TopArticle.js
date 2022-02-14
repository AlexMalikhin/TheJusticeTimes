import styles from './TopArticle.module.css';
import topArticle from "../../img/article_images/1.png";
import janayWright from "../../img/avatars/JanayWright.png";
import views from "../../img/viewsImg.png";

export const TopArticle = () => {
    return (
        <div className={styles.top_article}>
            <img src={topArticle} className={styles.img_article}/>
            <div className={styles.top_article_block}>
                <a className={styles.hashtags}>#Typography</a>
                <h2>Humane Typography in the Digital Age</h2>
                <p>
                    Human beings aren’t perfect. Perfection is something that will always elude us.
                    There will always be a small part of humanity in everything we do. No matter how small
                    that part, we should make sure that it transcends the limits of the medium. We have to
                    think about the message first. What typeface should we use and why?
                    Does the typeface match the message and what?
                </p>
                <div className={styles.bottom_block}>
                    <div className={styles.avatar_block}>
                        <img src={janayWright} className={styles.avatars} />
                        <span className={styles.avatar_name}>Janay Wright</span>
                    </div>
                    <div className={styles.m8}>
                        <span>Jun 13 · 5 min read</span>
                    </div>
                    <div className={styles.m8}>
                        <img src={views} className={styles.views}/>
                        <span className={styles.ml8}>1690</span>
                    </div>
                </div>
            </div>
        </div>
    );
}