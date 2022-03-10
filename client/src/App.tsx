import { Routes, Route, useNavigate } from 'react-router-dom'
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
import { fetchAllArticles } from './store/asyncActions/getAllArticles'

const App: React.FC = () => {
  const { logIn } = useContext(AppContext)
  const { allArticles } = useSelector((state) => state.articleReducer)
  const isAuth = useSelector((state: any) => state.userReducer.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllArticles())
  }, [logIn])

  return (
    <div className="App">
      <Header />
      <Routes>
        {isAuth && <Route path="/AddArticle" element={<AddArticle />} />}
        {logIn && <Route path="/MyArticles" element={<MyArticles />} />}
        {allArticles.length > 0 && (
          <Route path="/AllArticles" element={<Main />} />
        )}
        <Route path="/LogIn" element={<LogInPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        {isAuth && <Route path="/Profile" element={<ProfilePage />} />}
        <Route
          path={`/AllArticles/:articleId`}
          element={<FullArticlePage all={allArticles} />}
        />
        <Route
          path={`/MyArticles/:articleId`}
          element={<FullArticlePage all={allArticles} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
