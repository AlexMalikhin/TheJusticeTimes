import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/asyncActions/authActions/getUserData'
import { getMyArticles } from '../../store/asyncActions/articlesActions/getMyArticles'
import { Pagination } from '../Pagination/Pagination'
import { MyArticle } from '../MyArticle/MyArticle'
import styles from './MyArticles.module.css'
// @ts-ignore
import defaultAvatar from '../../img/defaultAvatar.png'
import { ArticleInterface } from '../../types/types'
import { RootState } from '../../store'

export const MyArticles: React.FC = () => {
  const [userArticlePage, setUserArticlePage] = useState(0)
  const dispatch = useDispatch()
  const { myArticles } = useSelector((state: RootState) => state.articleReducer)
  const { currentUser } = useSelector((state: RootState) => state.authReducer)

  useEffect(() => {
    dispatch(getMyArticles())
    dispatch(getCurrentUser())
  }, [])

  const slicedMyArticles = useMemo(
    () => myArticles?.slice(userArticlePage * 4, userArticlePage * 4 + 4),
    [userArticlePage, myArticles]
  )

  return (
    <div className={styles.container}>
      <div className={styles.main_block}>
        <div className={styles.user_info}>
          <img
            src={currentUser?.avatar || defaultAvatar}
            className={styles.avatar}
            alt={'profile avatar'}
          />
          <h3>
            {currentUser?.firstname} {currentUser?.lastname}
          </h3>
          <p className={styles.p}>{currentUser?.description}</p>
        </div>
        {myArticles?.length ? (
          <div className={styles.articles_list}>
            {slicedMyArticles?.map((article: ArticleInterface) => (
              <MyArticle
                id={article._id}
                key={article._id}
                headImg={article.headImg}
                firstname={article.firstname}
                lastname={article.lastname}
                avatar={article.avatar}
                views={article.views}
                title={article.title}
                text={article.text}
                date={article.date}
                category={article.category}
              />
            ))}
            <Pagination
              page={userArticlePage}
              setPage={setUserArticlePage}
              articlesLength={myArticles.length}
              type={'myArticles'}
              countPerPage={4}
            />
          </div>
        ) : (
          <h1>Articles not found you could create a new one </h1>
        )}
      </div>
    </div>
  )
}
