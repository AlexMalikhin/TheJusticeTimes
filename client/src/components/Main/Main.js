import { useContext, useMemo, useEffect, useState } from 'react'
import axios from 'axios'
import Article from './Articles/Article'
import { Pagination } from '../Pagination/Pagination'
import { TopArticle } from '../TopArticle/TopArticle'
import { AppContext } from '../AppContext/AppContext'
import styles from './Main.module.css'

export const Main = () => {
  const { currentPage, setCurrentPage, allArticles, setAllArticles } =
    useContext(AppContext)

  const [mostPopularArticle, setMostPopularArticle] = useState()

  useEffect(async () => {
    const getPopularArticle = await axios.get(
      'http://localhost:5001/article/getPopularArticle'
    )
    setMostPopularArticle(getPopularArticle.data.message)
    const all = await axios.get('http://localhost:5001/article/getAllArticles')
    setAllArticles(all.data.message)
  }, [])

  const slicedArticles = useMemo(
    () => allArticles.slice(currentPage * 6, currentPage * 6 + 6),
    [currentPage, allArticles]
  )

  const viewArticle = async (id) => {
    await axios.post('http://localhost:5001/article/viewArticle', { id: id })
    const all = await axios.get('http://localhost:5001/article/getAllArticles')
    setAllArticles(all.data.message)
  }

  return (
    <div className={styles.main_container}>
      <TopArticle props={mostPopularArticle} />
      <div className={styles.main_content}>
        <h1>Popular articles</h1>
        {slicedArticles.map((article) => (
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
