import { Link, useNavigate } from 'react-router-dom'
import { useContext, useCallback, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { AppContext } from '../AppContext/AppContext'
import logInPageStyles from './LogInPage.module.css'

export const LogInPage = () => {
  const {
    setAllArticles,
    setAuthKey,
    inputValueEmail,
    inputValuePassword,
    setInputValueEmail,
    setInputValuePassword,
    setEmailErrorText,
    setPasswordErrorText,
    emailErrorText,
    passwordErrorText,
    isRenderEmailError,
    isRenderPasswordError,
    setIsRenderEmailError,
    setIsRenderPasswordError,
    regExpForEmail,
    regExpForPassword,
  } = useContext(AppContext)

  useEffect(() => {
    setIsRenderEmailError(false)
    setIsRenderPasswordError(false)
    setEmailErrorText('')
    setPasswordErrorText('')
    setInputValueEmail('')
    setInputValuePassword('')
  }, [])

  const navigate = useNavigate()
  const logIn = useCallback(
    async (email, password) => {
      const user = {
        email: email,
        password: password,
      }
      if (!user.email || !user.password) {
        return
      }
      try {
        const { data } = await axios.post(
          'http://localhost:5001/auth/login',
          user
        )
        const getAllArticles = await axios.get(
          'http://localhost:5001/article/getAllArticles'
        )
        setAllArticles(getAllArticles.data.message)
        navigate('/AllArticles', { replace: true })
        Cookies.set('token', data.token)
        setAuthKey(Cookies.get('token'))
      } catch (e) {
        setEmailErrorText(e.response.data.message)
        setPasswordErrorText(e.response.data.message)
        setIsRenderEmailError(true)
        setIsRenderPasswordError(true)
      }
    },
    [inputValueEmail, inputValuePassword]
  )

  const isCorrectEmail = useCallback(() => {
    setIsRenderEmailError(true)
    setEmailErrorText('Please enter Email')
    if (regExpForEmail.test(inputValueEmail)) {
      setIsRenderEmailError(false)
    }
    if (inputValueEmail !== '' && !regExpForEmail.test(inputValueEmail)) {
      setIsRenderEmailError(true)
      setEmailErrorText('Please enter correct Email')
    }
  }, [inputValueEmail])

  const isEnterPassword = useCallback(() => {
    if (!regExpForPassword.test(inputValuePassword)) {
      setIsRenderPasswordError(true)
      setPasswordErrorText(
        'Password must have at least 6 characters and contain at least two of the' +
          'following: UPPERCASE letters, lowercase letters, numbers, and symbols($,@,!...)'
      )
    }
    // setIsRenderPasswordError(false)
  }, [inputValuePassword])

  return (
    <div className={logInPageStyles.container}>
      <div className={logInPageStyles.block}>
        <h2 className={logInPageStyles.header}>Log in to your account</h2>
        <Input
          name="email"
          placeholder="Enter your email..."
          label="Email Address"
          type="email"
          inputValue={inputValueEmail}
          changeValue={setInputValueEmail}
          isRenderError={isRenderEmailError}
          errorText={emailErrorText}
          blurHandle={isCorrectEmail}
          focusEvent={() => setIsRenderEmailError(false)}
        />
        <Input
          name="password"
          placeholder="Enter your password..."
          label="Password"
          type="password"
          inputValue={inputValuePassword}
          changeValue={setInputValuePassword}
          isRenderError={isRenderPasswordError}
          errorText={passwordErrorText}
          blurHandle={isEnterPassword}
          focusEvent={() => setIsRenderPasswordError(false)}
        />
        <Button
          type={'form_button'}
          title="Log in"
          click={() => logIn(inputValueEmail, inputValuePassword)}
        />
        <p className={logInPageStyles.create_account_link}>
          Don’t have a Times account?
          <Link to="/SignIn" className={logInPageStyles.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
