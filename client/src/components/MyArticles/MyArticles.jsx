import { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../Pagination/Pagination'
import { MyArticle } from '../MyArticle/MyArticle'
import { getCurrentUser } from '../../store/asyncActions/getUserData'
import { getMyArticles } from '../../store/asyncActions/getMyArticles'
import styles from './MyArticles.module.css'
import defaultAvatar from '../../img/defaultAvatar.png'

export const MyArticles = () => {
  const [userArticlePage, setUserArticlePage] = useState(0)
  const dispatch = useDispatch()
  const myArticles = useSelector((state) => state.articleReducer.myArticles)
  const currentUser = useSelector((state) => state.authReducer.user)
  useEffect(async () => {
    dispatch(getMyArticles())
    dispatch(getCurrentUser())
  }, [])

  const slicedMyArticles = useMemo(
    () => myArticles.slice(userArticlePage * 4, userArticlePage * 4 + 4),
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
        {myArticles.length ? (
          <div className={styles.articles_list}>
            {slicedMyArticles.map((article) => (
              <MyArticle props={article} key={article._id} />
            ))}
            <Pagination
              page={userArticlePage}
              setPage={setUserArticlePage}
              allArticles={myArticles || ''}
              type={'myArticles'}
              length={4}
            />
          </div>
        ) : (
          <h1>Articles not found you could create a new one </h1>
        )}
      </div>
    </div>
  )
}
