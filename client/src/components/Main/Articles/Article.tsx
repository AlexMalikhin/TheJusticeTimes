import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArticlesProps } from '../../../types/types'
import styles from './Article.module.scss'
// @ts-ignore
import defaultAvatar from '../../../img/defaultAvatar.png'
// @ts-ignore
import viewsImg from '../../../img/viewsImg.png'

const Article: React.FC<ArticlesProps> = ({ article, viewArticle }) => {
  const navigate = useNavigate()
  const showFullArticle = useCallback((id) => {
    if (viewArticle) {
      viewArticle(id)
    }
    navigate(`./${id}`, { replace: true })
  }, [])

  return (
    <div
      onClick={() => showFullArticle(article?._id)}
      className={styles.articles}
    >
      <div className={styles.img_block}>
        <img
          src={article?.headImg}
          className={styles.img_article}
          alt={'article image'}
        />
      </div>
      <div className={styles.article_block}>
        {/*<ul>*/}
        {/*  <li className={styles.hashtags}>*/}
        {/*    <a>{article?.category}</a>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        <div className={styles.hashtags}>#{article?.category}</div>
        <h2>{article?.title}</h2>
        <p className={styles.paragraph_short}>{article?.text}</p>
        <div className={styles.article_info}>
          <div className={styles.avatar_block}>
            <img
              src={article?.avatar ? article.avatar : defaultAvatar}
              className={styles.avatars}
              alt={'author avatar image'}
            />
            <span className={styles.avatar_name}>
              {article?.firstname} {article?.lastname}
            </span>
          </div>
          <div className={styles.mobile_stat}>
            <div className={styles.date}>
              <span>{article?.date}</span>
            </div>
            <div className={styles.views_block}>
              <img
                src={viewsImg}
                className={styles.views}
                alt={'view eye image'}
              />
              <span className={styles.ml8}>{article?.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
