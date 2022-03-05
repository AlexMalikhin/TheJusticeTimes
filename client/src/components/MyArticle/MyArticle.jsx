import { useNavigate } from 'react-router-dom'
import styles from './MyArticle.module.css'
import views from '../../img/viewsImg.png'
import defaultAvatar from '../../img/defaultAvatar.png'

export const MyArticle = (props) => {
  const navigate = useNavigate()
  const showFullArticle = () => {
    navigate(`./${props.props._id}`, { replace: true })
  }

  return (
    <div onClick={showFullArticle} className={styles.articles}>
      <img
        src={props.props.headImg}
        className={styles.img_article}
        alt={'article image'}
      />
      <div className={styles.article_block}>
        <ul>
          <li className={styles.hashtags}>{props.props.category}</li>
        </ul>
        <h2>{props.props.title}</h2>
        <p className={styles.short}>{props.props.text}</p>
        <div className={styles.article_info}>
          <div className={styles.avatar_block}>
            <img
              src={props.props.avatar ? props.props.avatar : defaultAvatar}
              className={styles.avatars}
              alt={'author avatar'}
            />
            <span className={styles.avatar_name}>
              {props.props.firstname} {props.props.lastname}
            </span>
          </div>
          <div className={styles.m8}>
            <span>{props.props.date}</span>
          </div>
          <div className={styles.ml8}>
            <img src={views} className={styles.views} alt={'view eye image'} />
            <span className={styles.ml8}>{props.props.views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
