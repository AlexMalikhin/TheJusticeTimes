import React from 'react'
import { Shimmer } from './Shimmer.js/Shimmer'
// @ts-ignore
import defaultAvatar from '../img/defaultAvatar.png'
// @ts-ignore
import viewsImg from '../img/viewsImg.png'
import skeletonStyles from './Skeleton.module.scss'

export const SkeletonElement = ({ type }: any) => {
  return (
    <div className={skeletonStyles.skeletonTopBlock}>
      <div className={skeletonStyles.img_article} />
      <div className={skeletonStyles.article_info}>
        <div className={skeletonStyles.hashtags} />
        <h2 className={skeletonStyles.header}>a</h2>
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.paragraph} />
        <div className={skeletonStyles.bottom_block}>
          <div className={skeletonStyles.avatar_block}>
            <div className={skeletonStyles.avatars} />
            <div className={skeletonStyles.avatar_name} />
          </div>
          <div className={skeletonStyles.date} />
          <div className={skeletonStyles.views} />
        </div>
      </div>
      <Shimmer />
    </div>
  )
}
