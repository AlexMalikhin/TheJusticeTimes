import React, { useContext, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { AppContext } from '../AppContext/AppContext'
import signInPageStyles from './SignInPage.module.css'

interface SignInInterface {
  firstname: string
  lastname: string
  email: string
  password: string
}

export const SignInPage: React.FC = () => {
  const {
    regExpForEmail,
    regExpForPassword,
    inputValueEmail,
    setInputValueEmail,
    inputValuePassword,
    setInputValuePassword,
    inputValueFirstName,
    setInputValueFirstName,
    inputValueLastName,
    setInputValueLastName,
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
  } = useContext(AppContext)
  const navigate = useNavigate()

  const handleSign = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    }
    if (!isValidNewUser()) {
      isCorrectFirstname()
      isCorrectLastname()
      isCorrectEmail()
      isCorrectPassword()
      return
    }
    try {
      await axios.post('http://localhost:5001/auth/registration', user)
      navigate('/LogIn', { replace: true })
    } catch (e: any) {
      //todo: any
      setEmailErrorText(e.response.data.message)
      setIsRenderEmailError(true)
    }
  }

  useEffect(() => {
    clearErrors()
    clearInputs()
  }, [])

  const isValidNewUser = () => {
    return (
      inputValueFirstName.length >= 2 &&
      inputValueLastName.length >= 2 &&
      regExpForEmail.test(inputValueEmail) &&
      !isEmailEmpty() &&
      regExpForPassword.test(inputValuePassword) &&
      !isPasswordEmpty()
    )
  }

  const isEmailEmpty = () => inputValueEmail === ''
  const isPasswordEmpty = () => inputValuePassword === ''

  const clearInputs = useCallback(() => {
    setInputValueFirstName('')
    setInputValueLastName('')
    setInputValueEmail('')
    setInputValuePassword('')
  }, [])

  const clearErrors = useCallback(() => {
    setFirstnameErrorText('')
    setLastnameErrorText('')
    setEmailErrorText('')
    setPasswordErrorText('')
    setIsRenderFirstnameError(false)
    setIsRenderLastnameError(false)
    setIsRenderEmailError(false)
    setIsRenderPasswordError(false)
  }, [])

  const isCorrectFirstname = () => {
    if (inputValueFirstName.length < 2) {
      setFirstnameErrorText('Please enter Firstname')
      setIsRenderFirstnameError(true)
    }
  }

  const isCorrectLastname = () => {
    if (inputValueLastName.length < 2) {
      setLastnameErrorText('Please enter Lastname')
      setIsRenderLastnameError(true)
    }
  }

  const isCorrectPassword = () => {
    setIsRenderPasswordError(true)
    setPasswordErrorText('Please enter password')
    if (regExpForPassword.test(inputValuePassword)) {
      setIsRenderPasswordError(false)
    }
    if (
      inputValuePassword !== '' &&
      !regExpForPassword.test(inputValuePassword)
    ) {
      setIsRenderPasswordError(true)
      setPasswordErrorText(
        'Password must have at least 6 characters and contain at ' +
          'least two of the following: UPPERCASE letters, lowercase letters, numbers, ' +
          'and symbols($,@,!...)'
      )
    }
  }

  const isCorrectEmail = () => {
    setIsRenderEmailError(true)
    setEmailErrorText('Please enter Email')
    if (regExpForEmail.test(inputValueEmail)) {
      setIsRenderEmailError(false)
    }
    if (inputValueEmail !== '' && !regExpForEmail.test(inputValueEmail)) {
      setIsRenderEmailError(true)
      setEmailErrorText('Please enter correct Email')
    }
  }

  return (
    <div className={signInPageStyles.container}>
      <div className={signInPageStyles.block}>
        <h2 className={signInPageStyles.header}>Create your free account</h2>
        <Input
          name="firstname"
          placeholder="Enter your firstname..."
          label="First name"
          type="text"
          inputValue={inputValueFirstName}
          changeValue={setInputValueFirstName}
          isRenderError={isRenderFirstnameError}
          errorText={firstnameErrorText}
          blurHandle={isCorrectFirstname}
          focusEvent={() => setIsRenderFirstnameError(false)}
        />
        <Input
          name="lastname"
          placeholder="Enter your lastname..."
          label="Last name"
          type="text"
          inputValue={inputValueLastName}
          changeValue={setInputValueLastName}
          isRenderError={isRenderLastnameError}
          errorText={lastnameErrorText}
          blurHandle={isCorrectLastname}
          focusEvent={() => setIsRenderLastnameError(false)}
        />
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
          placeholder="Enter new password..."
          label="Password"
          type="password"
          inputValue={inputValuePassword}
          changeValue={setInputValuePassword}
          isRenderError={isRenderPasswordError}
          errorText={passwordErrorText}
          blurHandle={isCorrectPassword}
          focusEvent={() => setIsRenderPasswordError(false)}
        />
        <Button
          type={'form_button'}
          title="Create Account"
          click={() =>
            handleSign(
              inputValueFirstName,
              inputValueLastName,
              inputValueEmail,
              inputValuePassword
            )
          }
        />
      </div>
    </div>
  )
}
