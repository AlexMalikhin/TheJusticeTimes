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
import { ArticleProps } from './Articles/Article'

export const Main: React.FC = () => {
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

  const viewArticle = (id: string) => {
    dispatch(viewArticleUpdate(id))
  }

  return (
    <div className={styles.main_container}>
      <TopArticle
        id={mostPopularArticle._id}
        img={mostPopularArticle.headImg}
        firstname={mostPopularArticle.firstname}
        lastname={mostPopularArticle.lastname}
        avatar={mostPopularArticle.avatar}
        views={mostPopularArticle.views}
        header={mostPopularArticle.title}
        paragraph={mostPopularArticle.text}
        date={mostPopularArticle.date}
        category={mostPopularArticle.category}
      />
      <div className={styles.main_content}>
        <h1>Popular articles</h1>
        {slicedArticles?.map(
          (article: {
            _id: string
            headImg: any
            firstname: string
            lastname: string
            avatar: string
            views: number
            title: string
            text: string
            date: string
            category: string
          }) => (
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
              category={article.category}
              viewArticle={viewArticle}
            />
          )
        )}
        <Pagination
          setPage={setCurrentPage}
          page={currentPage}
          articlesLength={allArticles.length}
          type={'allArticles'}
          countPerPage={6}
        />
      </div>
    </div>
  )
}
