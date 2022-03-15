import React, { useContext, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from '../Pagination/Pagination'
import { TopArticle } from '../TopArticle/TopArticle'
import { AppContext } from '../AppContext/AppContext'
import Article from './Articles/Article'
import { getPopularArticle } from '../../store/asyncActions/articlesActions/getMostPopularArticle'
import { viewArticleUpdate } from '../../store/asyncActions/articlesActions/viewArticle'
import { fetchAllArticles } from '../../store/asyncActions/articlesActions/getAllArticles'
import { ArticleInterface } from '../../types/types'
import { RootState } from '../../store'
import styles from './Main.module.scss'

export const Main: React.FC = () => {
  const { currentPage, setCurrentPage, setLogIn, logIn } =
    useContext(AppContext)
  const dispatch = useDispatch()
  const { allArticles } = useSelector(
    (state: RootState) => state.articleReducer
  )
  const { mostPopularArticle } = useSelector(
    (state: RootState) => state.articleReducer
  )

  useEffect(() => {
    if (!allArticles) {
      dispatch(fetchAllArticles())
      dispatch(getPopularArticle())
    }
  }, [])

  const slicedArticles = useMemo(
    () => allArticles?.slice(currentPage * 6, currentPage * 6 + 6),
    [currentPage, allArticles]
  )

  const viewArticle = (id: string) => {
    dispatch(viewArticleUpdate(id))
  }

  return (
    <div className={styles.main_container}>
      {/*<TopArticle topArticle={mostPopularArticle} />*/}
      <div className={styles.main_content}>
        <h1>Popular articles</h1>
        {slicedArticles?.map((article) => (
          <Article article={article} viewArticle={viewArticle} />
        ))}
        <Pagination
          setPage={setCurrentPage}
          page={currentPage}
          articlesLength={allArticles?.length}
          type={'allArticles'}
          countPerPage={6}
        />
      </div>
    </div>
  )
}
