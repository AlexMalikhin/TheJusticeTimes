import React from 'react'
import styles from '../components/TopArticle/TopArticle.module.css'
// @ts-ignore
import defaultAvatar from '../img/defaultAvatar.png'
// @ts-ignore
import viewsImg from '../img/viewsImg.png'
import skeletonStyles from './Skeleton.module.css'

export const SkeletonElement = ({ type }: any) => {
  return (
    <div className={skeletonStyles.skeletonTopBlock}>
      <div className={skeletonStyles.img_article} />
      <div className={styles.top_article_block}>
        <a className={styles.hashtags}>fwfwfqfwqf</a>
        <h2>fqwfqwfwfwfq</h2>
        <p className={styles.paragraph}>fqwfqwfqwfwf</p>
        <div className={styles.bottom_block}>
          <div className={styles.avatar_block}>
            <img
              src={defaultAvatar}
              className={styles.avatars}
              alt={'author avatar image'}
            />
            <span className={styles.avatar_name}>fqwfqwf fqwfqwfqwfwq</span>
          </div>
          <div className={styles.time}>
            <span>29 0726</span>
          </div>
          <div className={styles.views_block}>
            <img
              src={viewsImg}
              className={styles.views}
              alt={'view eye image'}
            />
            <span className={styles.ml8}>28</span>
          </div>
        </div>
      </div>
    </div>
  )
}
