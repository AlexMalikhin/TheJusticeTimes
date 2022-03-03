import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../Button/Button'
import fullPageStyles from './FullArticlePage.module.css'
import viewsImg from '../../img/viewsImg.png'
import defaultAvatar from '../../img/defaultAvatar.png'

export const FullArticlePage = ({ article }) => {
  const navigate = useNavigate()
  const getPath = () =>
    document.location.pathname === `/AllArticles/${article._id}`
  const linkToAllArticles = () => {
    if (!!getPath()) {
      return navigate('/AllArticles', { replace: true })
    } else {
      return navigate('/MyArticles', { replace: true })
    }
  }

  return (
    <div className={fullPageStyles.main_container}>
      <Button
        click={linkToAllArticles}
        title={!!getPath() ? 'AllArticles' : 'MyArticles'}
        type={'all_articles'}
      />
      <div className={fullPageStyles.fullPage_container}>
        <div className={fullPageStyles.fullPage}>
          <ul>
            <li className={fullPageStyles.hashtags}>
              <a>{article.category}</a>
            </li>
          </ul>
          <h1>{article.title}</h1>
          <img
            className={fullPageStyles.article_img}
            src={article.headImg}
            alt={'Head image of popular article'}
          />
          <p className={fullPageStyles.paragraph_fullPage}>{article.text}</p>
        </div>
        <div className={fullPageStyles.space_between}>
          <div className={fullPageStyles.article_info}>
            <div className={fullPageStyles.avatar_block}>
              <img
                src={article.avatar ? article.avatar : defaultAvatar}
                className={fullPageStyles.avatars}
                alt={'user avatar'}
              />
              <span className={fullPageStyles.avatar_name}>
                {article.firstname} {article.lastname}
              </span>
            </div>
            <div className={fullPageStyles.m8}>
              <span>
                {article.monthOfCreated} {article.dayOfCreated} ·{' '}
                {article.timeOfCreated}
              </span>
            </div>
            <div className={fullPageStyles.ml8}>
              <img
                src={viewsImg}
                className={fullPageStyles.views}
                alt={'views eye image'}
              />
              <span className={fullPageStyles.ml8}>{article.views}</span>
            </div>
          </div>
          <Button title={article.category} type={'category'} />
        </div>
      </div>
    </div>
  )
}
