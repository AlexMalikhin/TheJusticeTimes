import { useContext, useMemo, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AppContext } from '../AppContext/AppContext'
import { Pagination } from '../Pagination/Pagination'
import { MyArticle } from '../MyArticle/MyArticle'
import styles from './MyArticles.module.css'
import defaultAvatar from '../../img/defaultAvatar.png'

export const MyArticles = () => {
  const {
    userArticlePage,
    setUserArticlePage,
    myArticles,
    setMyArticles,
    currentUserFirstName,
    currentUserLastName,
    currentUserDescription,
    setCurrentUserFirstName,
    setCurrentUserLastName,
    setCurrentUserDescription,
    profileAvatar,
    setProfileAvatar,
  } = useContext(AppContext)

  useEffect(async () => {
    const token = { token: await Cookies.get('token') }

    if (token.token) {
      const getMyArticles = await axios.post(
        'http://localhost:5001/article/getMyArticles',
        token
      )
      setMyArticles(getMyArticles.data.message)
      const user = await axios.post(
        'http://localhost:5001/user/getUserData',
        token
      )
      setCurrentUserFirstName(user.data.firstname)
      setCurrentUserLastName(user.data.lastname)
      setProfileAvatar(user.data.avatar)
      setCurrentUserDescription(user.data.description)
    }
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
            src={profileAvatar || defaultAvatar}
            className={styles.avatar}
            alt={'profile avatar'}
          />
          <h3>
            {currentUserFirstName} {currentUserLastName}
          </h3>
          <p className={styles.p}>{currentUserDescription}</p>
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
