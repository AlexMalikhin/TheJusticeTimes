import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import viewsImg from '../../../img/viewsImg.png'
import styles from './Article.module.css'
import defaultAvatar from '../../../img/defaultAvatar.png'

const Article = ({
  id,
  img,
  firstname,
  lastname,
  avatar,
  views,
  header,
  paragraph,
  date,
  tags,
  viewArticle,
}) => {
  const navigate = useNavigate()
  const { articleId } = useParams()
  const showFullArticle = useCallback((id) => {
    viewArticle(id)
    navigate(`./${id}`, { replace: true })
  }, [])

  return (
    <div onClick={() => showFullArticle(id)} className={styles.articles}>
      <img src={img} className={styles.img_article} alt={'article image'} />
      <div className={styles.article_block}>
        <ul>
          <li className={styles.hashtags}>
            <a>{tags}</a>
          </li>
        </ul>
        <h2>{header}</h2>
        <p className={styles.paragraph_short}>{paragraph}</p>
        <div className={styles.article_info}>
          <div className={styles.avatar_block}>
            <img
              src={avatar ? avatar : defaultAvatar}
              className={styles.avatars}
              alt={'author avatar image'}
            />
            <span className={styles.avatar_name}>
              {firstname} {lastname}
            </span>
          </div>
          <div className={styles.m8}>
            <span>{date}</span>
          </div>
          <div className={styles.ml8}>
            <img
              src={viewsImg}
              className={styles.views}
              alt={'view eye image'}
            />
            <span className={styles.ml8}>{views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
