import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
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
import Cookies from 'js-cookie'
import axios from 'axios'

function App() {
  const {
    logIn,
    authKey,
    setAuthKey,
    setAllArticles,
    allArticles,
    setMyArticles,
  } = useContext(AppContext)

  useEffect(async () => {
    const token = { token: await Cookies.get('token') }
 
    if (!token.token) {
      const getAllArticles = await axios.get(
        'http://localhost:5001/article/getAllArticles'
      )
      console.log(getAllArticles)
      setAllArticles(getAllArticles.data.message)
    } else {
      await setAuthKey(token.token)
      const getAllArticles = await axios.get(
        'http://localhost:5001/article/getAllArticles'
      )
      setAllArticles(getAllArticles.data.message)
      const getMyArticles = await axios.get(
        'http://localhost:5001/article/getMyArticles',
        { headers: { Authorization: token.token } }
      )
      setMyArticles(getMyArticles.data.message)
    }
  }, [logIn])

  return (
    <div className="App">
      <Header />

      <Routes>
        {authKey && <Route path="/AddArticle" element={<AddArticle />} />}
        {logIn && <Route path="/MyArticles" element={<MyArticles />} />}
        {allArticles.length > 0 && (
          <Route path="/AllArticles" element={<Main />} />
        )}
        <Route path="/LogIn" element={<LogInPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        {authKey && <Route path="/Profile" element={<ProfilePage />} />}
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
