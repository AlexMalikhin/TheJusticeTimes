import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { userLogIn } from '../../store/asyncActions/authActions/userLogIn'
import { AppContext } from '../AppContext/AppContext'
import logInPageStyles from './LogInPage.module.scss'

export const LogInPage: React.FC = () => {
  const {
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logIn = useCallback(
    async (email: string, password: string) => {
      try {
        dispatch(userLogIn(email, password))
        navigate('/AllArticles', { replace: true })
      } catch (e: any) {
        //todo: any
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
    setIsRenderPasswordError(false)
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
          classNam={'input_auth'}
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
          classNam={'input_auth'}
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
