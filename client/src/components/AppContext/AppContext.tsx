import React, { createContext, useState } from 'react'

export const AppContext = createContext<any>({})

export const AppContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const regExpForEmail: any = new RegExp('^\\S+@\\S+\\.\\S+$')
  const regExpForPassword: any = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'
  )

  const [currentPage, setCurrentPage] = useState(0)
  const [userArticlePage, setUserArticlePage] = useState<number>(0)
  const [logIn, setLogIn] = useState<boolean>(false)
  const [authKey, setAuthKey] = useState()

  const [inputValueFirstName, setInputValueFirstName] = useState<string>('')
  const [inputValueLastName, setInputValueLastName] = useState<string>('')
  const [inputValueEmail, setInputValueEmail] = useState<string>('')
  const [inputValuePassword, setInputValuePassword] = useState<string>('')

  const [isRenderFirstnameError, setIsRenderFirstnameError] =
    useState<boolean>(false)
  const [isRenderLastnameError, setIsRenderLastnameError] =
    useState<boolean>(false)
  const [isRenderEmailError, setIsRenderEmailError] = useState<boolean>(false)
  const [isRenderPasswordError, setIsRenderPasswordError] =
    useState<boolean>(false)

  const [firstnameErrorText, setFirstnameErrorText] = useState<string>('')
  const [lastnameErrorText, setLastnameErrorText] = useState<string>('')
  const [emailErrorText, setEmailErrorText] = useState<string>('')
  const [passwordErrorText, setPasswordErrorText] = useState<string>('')

  const [currentUser, setCurrentUser] = useState({})
  const [profileAvatar, setProfileAvatar] = useState<string>('')
  const [currentUserFirstName, setCurrentUserFirstName] = useState<string>('')
  const [currentUserLastName, setCurrentUserLastName] = useState<string>('')
  const [currentUserDescription, setCurrentUserDescription] =
    useState<string>('')

  const [myArticles, setMyArticles] = useState([])
  const [allArticles, setAllArticles] = useState([])
  const [currentArticle, setCurrentArticle] = useState()

  return (
    <AppContext.Provider
      value={{
        regExpForEmail,
        regExpForPassword,

        userArticlePage,
        setUserArticlePage,
        currentPage,
        setCurrentPage,
        logIn,
        setLogIn,
        authKey,
        setAuthKey,

        inputValueFirstName,
        inputValueLastName,
        inputValueEmail,
        inputValuePassword,
        setInputValueFirstName,
        setInputValueLastName,
        setInputValueEmail,
        setInputValuePassword,

        isRenderFirstnameError,
        isRenderLastnameError,
        isRenderEmailError,
        isRenderPasswordError,
        setIsRenderFirstnameError,
        setIsRenderLastnameError,
        setIsRenderEmailError,
        setIsRenderPasswordError,

        firstnameErrorText,
        lastnameErrorText,
        emailErrorText,
        passwordErrorText,
        setFirstnameErrorText,
        setLastnameErrorText,
        setEmailErrorText,
        setPasswordErrorText,

        currentUserFirstName,
        currentUserLastName,
        currentUserDescription,
        setCurrentUserFirstName,
        setCurrentUserLastName,
        setCurrentUserDescription,

        currentUser,
        setCurrentUser,
        allArticles,
        setAllArticles,
        currentArticle,
        setCurrentArticle,

        profileAvatar,
        setProfileAvatar,
        myArticles,
        setMyArticles,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
