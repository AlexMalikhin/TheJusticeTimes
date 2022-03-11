import { useNavigate } from 'react-router-dom'
import React from 'react'
import styles from './TopArticle.module.css'
// @ts-ignore
import viewsImg from '../../img/viewsImg.png'
// @ts-ignore
import defaultAvatar from '../../img/defaultAvatar.png'
import { ArticleProps } from '../Main/Articles/Article'

export const TopArticle: React.FC<ArticleProps> = ({
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
}) => {
  const navigate = useNavigate()
  const showFullArticle = () => {
    navigate(`/AllArticles/${id}`)
  }

  return (
    <div onClick={showFullArticle} className={styles.top_article}>
      <img
        src={img}
        className={styles.img_article}
        alt={'most popular article image'}
      />
      <div className={styles.top_article_block}>
        <a className={styles.hashtags}>{category}</a>
        <h2>{header}</h2>
        <p className={styles.paragraph}>{paragraph}</p>
        <div className={styles.bottom_block}>
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
          <div className={styles.time}>
            <span>{date}</span>
          </div>
          <div className={styles.views_block}>
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
