import { useNavigate } from 'react-router-dom'
import styles from './TopArticle.module.css'
import views from '../../img/viewsImg.png'
import defaultAvatar from '../../img/defaultAvatar.png'

export const TopArticle = ({ props }) => {
  const navigate = useNavigate()
  const showFullArticle = () => {
    navigate(`/AllArticles/${props._id}`)
  }

  return (
    <div onClick={showFullArticle} className={styles.top_article}>
      <img
        src={props?.headImg}
        className={styles.img_article}
        alt={'most popular article image'}
      />
      <div className={styles.top_article_block}>
        <a className={styles.hashtags}>{props?.category}</a>
        <h2>{props?.title}</h2>
        <p className={styles.paragraph}>{props?.text}</p>
        <div className={styles.bottom_block}>
          <div className={styles.avatar_block}>
            <img
              src={props?.avatar ? props?.avatar : defaultAvatar}
              className={styles.avatars}
              alt={'author avatar image'}
            />
            <span className={styles.avatar_name}>
              {props?.firstname} {props?.lastname}
            </span>
          </div>
          <div className={styles.time}>
            <span>{props?.date}</span>
          </div>
          <div className={styles.views_block}>
            <img src={views} className={styles.views} alt={'view eye image'} />
            <span className={styles.ml8}>{props?.views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
