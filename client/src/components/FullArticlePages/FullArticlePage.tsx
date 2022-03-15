import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useContext } from 'react'
import { AppContext } from '../AppContext/AppContext'
import { Button } from '../Button/Button'
import { AllArticlesInterface } from './types'
import fullPageStyles from './FullArticlePage.module.scss'
// @ts-ignore
import viewsImg from '../../img/viewsImg.png'
// @ts-ignore
import defaultAvatar from '../../img/defaultAvatar.png'

export const FullArticlePage: React.FC<AllArticlesInterface> = ({
  allArticles,
}) => {
  const { articleId } = useParams()
  const { currentArticle, setCurrentArticle } = useContext(AppContext)

  useEffect(() => {
    setCurrentArticle(allArticles?.find((item) => item._id === articleId))
  }, [articleId, allArticles])

  const navigate = useNavigate()
  const getPath = () =>
    document.location.pathname === `/AllArticles/${articleId}`

  const linkToAllArticles = () => {
    if (getPath()) {
      return navigate('/AllArticles', { replace: true })
    } else {
      return navigate('/MyArticles', { replace: true })
    }
  }

  return (
    <div className={fullPageStyles.main_container}>
      <Button
        click={linkToAllArticles}
        title={getPath() ? 'AllArticles' : 'MyArticles'}
        type={'all_articles'}
      />
      <div className={fullPageStyles.fullPage_container}>
        <div className={fullPageStyles.fullPage}>
          <ul>
            <li className={fullPageStyles.hashtags}>
              <a>{currentArticle?.category}</a>
            </li>
          </ul>
          <h1>{currentArticle?.title}</h1>
          <img
            className={fullPageStyles.article_img}
            src={currentArticle?.headImg}
            alt={'Head image of popular article'}
          />
          <p className={fullPageStyles.paragraph_fullPage}>
            {currentArticle?.text}
          </p>
        </div>
        <div className={fullPageStyles.space_between}>
          <div className={fullPageStyles.article_info}>
            <div className={fullPageStyles.avatar_block}>
              <img
                src={
                  currentArticle?.avatar
                    ? currentArticle?.avatar
                    : defaultAvatar
                }
                className={fullPageStyles.avatars}
                alt={'user avatar'}
              />
              <span className={fullPageStyles.avatar_name}>
                {currentArticle?.firstname} {currentArticle?.lastname}
              </span>
            </div>
            <div className={fullPageStyles.m8}>
              <span>{currentArticle?.date}</span>
            </div>
            <div className={fullPageStyles.ml8}>
              <img
                src={viewsImg}
                className={fullPageStyles.views}
                alt={'views eye image'}
              />
              <span className={fullPageStyles.ml8}>
                {currentArticle?.views}
              </span>
            </div>
          </div>
          <Button title={currentArticle?.category} type={'category'} />
        </div>
      </div>
    </div>
  )
}
