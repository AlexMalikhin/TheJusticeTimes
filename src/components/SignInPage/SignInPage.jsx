import {useContext, useCallback, useEffect} from 'react';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import {AppContext} from '../AppContext/AppContext';
import signInPageStyles from './SignInPage.module.css';
import buttonStyles from '../Button/Button.module.css';
import {defaultAvatar} from '../../img/defaultAvatar.png';

export const SignInPage = () => {
    const {
        users,
        setUsers,
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
    } = useContext(AppContext);

    useEffect(()=>{
       clearErrors();
       clearInputs();
    },[])

    const createNewUser = () =>{
        if(!isValidNewUser()){
            isCorrectFirstname();
            isCorrectLastname();
            isCorrectEmail();
            isCorrectPassword();
            if(isEmailTaken()){
                setIsRenderEmailError(true);
                setEmailErrorText('This Email Already has taken');
            }
            return
        }
        const newUsers = [
            ...users,
            {
                'userId': Math.random().toString(36).substr(2, 13),
                'firstname': inputValueFirstName,
                'lastname': inputValueLastName,
                'email': inputValueEmail,
                'password': inputValuePassword,
                'description': '',
                'avatar': defaultAvatar,
            }]
        setUsers(newUsers);
        if(!JSON.parse(localStorage.getItem('authKey'))){
            localStorage.setItem('authKey', '');
        }
        localStorage.setItem('users', JSON.stringify(newUsers));
        clearInputs();
        clearErrors();
    }

    const isValidNewUser = () =>{
        const result = inputValueFirstName.length >=2 && inputValueLastName.length >=2
            && regExpForEmail.test(inputValueEmail) && !isEmailTaken() && !isEmailEmpty()
            && regExpForPassword.test(inputValuePassword) && !isPasswordEmpty()
        return result
    }

    const isEmailTaken = useCallback(()=>{
        return users.some(user => user.email === inputValueEmail)
    },[users, inputValueEmail])

    const isEmailEmpty = () => inputValueEmail === '';


    const isPasswordEmpty = () => inputValuePassword === '';


    const clearInputs = useCallback(() => {
        setInputValueFirstName('');
        setInputValueLastName('');
        setInputValueEmail('');
        setInputValuePassword('');
    }, [])

    const clearErrors = useCallback(() => {
        setFirstnameErrorText('');
        setLastnameErrorText('');
        setEmailErrorText('');
        setPasswordErrorText('');
        setIsRenderFirstnameError(false);
        setIsRenderLastnameError(false);
        setIsRenderEmailError(false);
        setIsRenderPasswordError(false);
    }, [])

    const isCorrectFirstname = () =>{
        if(inputValueFirstName.length < 2){
            setFirstnameErrorText('Please enter Firstname');
            setIsRenderFirstnameError(true);
        }
    }

    const isCorrectLastname = () =>{
        if(inputValueLastName.length < 2){
            setLastnameErrorText('Please enter Lastname');
            setIsRenderLastnameError(true);
        }
    }

    const isCorrectPassword = () =>{
        setIsRenderPasswordError(true)
        setPasswordErrorText('Please enter password')
        if(regExpForPassword.test(inputValuePassword)){
            setIsRenderPasswordError(false);
        }
        if(inputValuePassword !== '' && !regExpForPassword.test(inputValuePassword)){
            setIsRenderPasswordError(true)
            setPasswordErrorText('Password must have at least 6 characters and contain at ' +
                'least two of the following: UPPERCASE letters, lowercase letters, numbers, ' +
                'and symbols($,@,!...)'
            )
        }
    }

    const isCorrectEmail = () =>{
        setIsRenderEmailError(true)
        setEmailErrorText('Please enter Email');
        if(regExpForEmail.test(inputValueEmail)){
            setIsRenderEmailError(false);
        }
        if(inputValueEmail !== '' && !regExpForEmail.test(inputValueEmail)){
            setIsRenderEmailError(true)
            setEmailErrorText('Please enter correct Email')
        }
    }

    return (
        <div className={signInPageStyles.container}>
            <div className={signInPageStyles.block}>
                <h2 className={signInPageStyles.header}>Create your free account</h2>
                <Input
                    name='firstname'
                    placeholder='Enter your firstname...'
                    label='First name'
                    type='text'
                    inputValue={inputValueFirstName}
                    changeValue={setInputValueFirstName}
                    isRenderError={isRenderFirstnameError}
                    errorText={firstnameErrorText}
                    blurHandle={isCorrectFirstname}
                    focusEvent={()=> setIsRenderFirstnameError(false)}
                />
                <Input
                    name='lastname'
                    placeholder='Enter your lastname...'
                    label='Last name'
                    type='text'
                    inputValue={inputValueLastName}
                    changeValue={setInputValueLastName}
                    isRenderError={isRenderLastnameError}
                    errorText={lastnameErrorText}
                    blurHandle={isCorrectLastname}
                    focusEvent={()=> setIsRenderLastnameError(false)}
                />
                <Input
                    name='email'
                    placeholder='Enter your email...'
                    label='Email Address'
                    type='email'
                    inputValue={inputValueEmail}
                    changeValue={setInputValueEmail}
                    isRenderError={isRenderEmailError}
                    errorText={emailErrorText}
                    blurHandle={isCorrectEmail}
                    focusEvent={()=> setIsRenderEmailError(false)}
                />
                <Input
                    name='password'
                    placeholder='Enter new password...'
                    label='Password'
                    type='password'
                    inputValue={inputValuePassword}
                    changeValue={setInputValuePassword}
                    isRenderError={isRenderPasswordError}
                    errorText={passwordErrorText}
                    blurHandle={isCorrectPassword}
                    focusEvent={()=> setIsRenderPasswordError(false)}
                />
                <Button style={buttonStyles.form_button} title='Create Account' click={createNewUser}/>
            </div>
        </div>
    );
}