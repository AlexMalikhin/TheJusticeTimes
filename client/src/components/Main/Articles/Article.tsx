import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
import viewsImg from '../../../img/viewsImg.png'
import styles from './Article.module.css'
// @ts-ignore
import defaultAvatar from '../../../img/defaultAvatar.png'

export interface ArticleProps {
  id: string
  img: any
  firstname: string
  lastname: string
  avatar: string
  views: number
  header: string
  paragraph: string
  date: string
  category: string
  viewArticle?: (id: string) => any
}

const Article: React.FC<ArticleProps> = ({
  id,
  img,
  firstname,
  lastname,
  avatar,
  views,
  header,
  paragraph,
  date,
  category,
  viewArticle,
}) => {
  const navigate = useNavigate()
  const showFullArticle = useCallback((id) => {
    if (viewArticle) {
      viewArticle(id)
    }
    navigate(`./${id}`, { replace: true })
  }, [])

  return (
    <div onClick={() => showFullArticle(id)} className={styles.articles}>
      <img src={img} className={styles.img_article} alt={'article image'} />
      <div className={styles.article_block}>
        <ul>
          <li className={styles.hashtags}>
            <a>{category}</a>
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
