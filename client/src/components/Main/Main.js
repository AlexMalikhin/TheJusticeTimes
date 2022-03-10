import React, { useContext, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Article from './Articles/Article'
import { Pagination } from '../Pagination/Pagination'
import { TopArticle } from '../TopArticle/TopArticle'
import { AppContext } from '../AppContext/AppContext'
import { fetchPopularArticle } from '../../store/asyncActions/getMostPopularArticle'
import { viewArticleUpdate } from '../../store/asyncActions/viewArticle'
import styles from './Main.module.css'
import { fetchAllArticles } from '../../store/asyncActions/getAllArticles'

export const Main = () => {
  const { currentPage, setCurrentPage, setLogIn, logIn } =
    useContext(AppContext)
  const dispatch = useDispatch()
  const { allArticles } = useSelector((state) => state.articleReducer)
  const mostPopularArticle = useSelector(
    (state) => state.articleReducer.mostPopularArticle
  )

  useEffect(() => {
    dispatch(fetchAllArticles())
    dispatch(fetchPopularArticle())
  }, [])

  const slicedArticles = useMemo(
    () => allArticles.slice(currentPage * 6, currentPage * 6 + 6),
    [currentPage, allArticles]
  )

  const viewArticle = async (id) => {
    dispatch(viewArticleUpdate(id))
  }

  return (
    <div className={styles.main_container}>
      <TopArticle props={mostPopularArticle} />
      <div className={styles.main_content}>
        <h1>Popular articles</h1>
        {slicedArticles?.map((article) => (
          <Article
            id={article._id}
            key={article._id}
            img={article.headImg}
            firstname={article.firstname}
            lastname={article.lastname}
            avatar={article.avatar}
            views={article.views}
            header={article.title}
            paragraph={article.text}
            date={article.date}
            tags={article.category}
            viewArticle={viewArticle}
          />
        ))}
        <Pagination
          setPage={setCurrentPage}
          page={currentPage}
          allArticles={allArticles}
          type={'allArticles'}
          length={6}
        />
      </div>
    </div>
  )
}
