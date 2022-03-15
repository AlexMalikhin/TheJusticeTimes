import { Routes, Route } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import { Header } from './components/Header/Header'
import { LogInPage } from './components/LogInPage/LogInPage'
import { SignInPage } from './components/SignInPage/SignInPage'
import { AppContext } from './components/AppContext/AppContext'
import { ProfilePage } from './components/ProfilePage/ProfilePage'
import { FullArticlePage } from './components/FullArticlePages/FullArticlePage'
import { AddArticle } from './components/AddArticle/AddArticle'
import { MyArticles } from './components/MyArticles/MyArticles'
import { fetchAllArticles } from './store/asyncActions/articlesActions/getAllArticles'
import { RootState } from './store'
import { getPopularArticle } from './store/asyncActions/articlesActions/getMostPopularArticle'

const App: React.FC = () => {
  const { logIn } = useContext(AppContext)
  const { allArticles } = useSelector(
    (state: RootState) => state.articleReducer
  )
  const isAuth = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularArticle())
    dispatch(fetchAllArticles())
  }, [])

  return (
    <div className="App">
      <Header />
      {/*<Routes>*/}
      {/*  {isAuth && <Route path="/AddArticle" element={<AddArticle />} />}*/}
      {/*  {logIn && <Route path="/MyArticles" element={<MyArticles />} />}*/}

      {/*  <Route path="/AllArticles" element={<Main />} />*/}
      {/*  <Route path="/LogIn" element={<LogInPage />} />*/}
      {/*  <Route path="/SignIn" element={<SignInPage />} />*/}
      {/*  {isAuth && <Route path="/Profile" element={<ProfilePage />} />}*/}
      {/*  <Route*/}
      {/*    path={`/AllArticles/:articleId`}*/}
      {/*    element={<FullArticlePage allArticles={allArticles} />}*/}
      {/*  />*/}
      {/*  <Route*/}
      {/*    path={`/MyArticles/:articleId`}*/}
      {/*    element={<FullArticlePage allArticles={allArticles} />}*/}
      {/*  />*/}
      {/*</Routes>*/}
      <Footer />
    </div>
  )
}

export default App
