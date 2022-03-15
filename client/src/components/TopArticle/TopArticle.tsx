import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArticlesProps } from '../../types/types'
import { SkeletonElement } from '../../skeletons/SkeletonElement'
import { ArticleInterface } from '../../types/types'
import styles from './TopArticle.module.scss'
// @ts-ignore
import viewsImg from '../../img/viewsImg.png'
// @ts-ignore
import defaultAvatar from '../../img/defaultAvatar.png'

export const TopArticle: React.FC<ArticlesProps> = ({ topArticle }) => {
  const navigate = useNavigate()
  const showFullArticle = () => {
    navigate(`/AllArticles/${topArticle?._id}`)
  }

  return (
    <>
      {topArticle ? (
        <div onClick={showFullArticle} className={styles.top_article}>
          <img
            src={topArticle?.headImg}
            className={styles.img_article}
            alt={'most popular article image'}
          />
          <div className={styles.top_article_block}>
            <a className={styles.hashtags}>{topArticle?.category}</a>
            <h2>{topArticle?.title}</h2>
            <p className={styles.paragraph}>{topArticle?.text}</p>
            <div className={styles.bottom_block}>
              <div className={styles.avatar_block}>
                <img
                  src={topArticle?.avatar ? topArticle.avatar : defaultAvatar}
                  className={styles.avatars}
                  alt={'author avatar image'}
                />
                <span className={styles.avatar_name}>
                  {topArticle?.firstname} {topArticle?.lastname}
                </span>
              </div>
              <div className={styles.time}>
                <span>{topArticle?.date}</span>
              </div>
              <div className={styles.views_block}>
                <img
                  src={viewsImg}
                  className={styles.views}
                  alt={'view eye image'}
                />
                <span className={styles.ml8}>{topArticle?.views}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonElement />
      )}
    </>
  )
}
