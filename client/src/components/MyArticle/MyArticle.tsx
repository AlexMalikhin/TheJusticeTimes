import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MyArticle.module.css'
// @ts-ignore
import viewsImg from '../../img/viewsImg.png'
// @ts-ignore
import defaultAvatar from '../../img/defaultAvatar.png'
import { ArticleInterface } from '../../types/types'

export const MyArticle: React.FC<ArticleInterface> = ({
  id,
  headImg,
  firstname,
  lastname,
  avatar,
  views,
  title,
  text,
  date,
  category,
}) => {
  const navigate = useNavigate()
  const showFullArticle = () => {
    navigate(`./${id}`, { replace: true })
  }

  return (
    <div onClick={showFullArticle} className={styles.articles}>
      <img src={headImg} className={styles.img_article} alt={'article image'} />
      <div className={styles.article_block}>
        <ul>
          <li className={styles.hashtags}>{category}</li>
        </ul>
        <h2>{title}</h2>
        <p className={styles.short}>{text}</p>
        <div className={styles.article_info}>
          <div className={styles.avatar_block}>
            <img
              src={avatar ? avatar : defaultAvatar}
              className={styles.avatars}
              alt={'author avatar'}
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
