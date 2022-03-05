import { Routes, Route } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
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
import {context} from "./@types/context";

const App: React.FC = () => {
  const {logIn, currentPage } = useContext<context>(AppContext)

  useEffect(() => {
    //todo: any
    const token: any = { token: Cookies.get('token') }

    async function getAllArticles(): Promise<void> {
      await axios
        .get('http://localhost:5001/article/getAllArticles')
        .then((res) => setAllArticles(res.data.message))
    }

    async function getMyArticles(): Promise<void> {
      await axios
        .get('http://localhost:5001/article/getMyArticles', {
          headers: { Authorization: token.token },
        })
        .then((res) => setMyArticles(res.data.message))
    }

    if (!token.token) {
      getAllArticles().then()
    } else {
      setAuthKey(token.token)
      getAllArticles().then(() => getMyArticles())
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
        {/*<Route*/}
        {/*  path={`/AllArticles/:articleId`}*/}
        {/*  element={<FullArticlePage all={allArticles} />}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={`/MyArticles/:articleId`}*/}
        {/*  element={<FullArticlePage all={allArticles} />}*/}
        {/*/>*/}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
