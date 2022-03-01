import {Link, useNavigate} from 'react-router-dom';
import {useContext, useCallback, useEffect} from 'react';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import {AppContext} from '../AppContext/AppContext';
import logInPageStyles from './LogInPage.module.css';
import buttonStyles from '../Button/Button.module.css';
import axios from "axios";
import Cookies from "js-cookie";

export const LogInPage = () => {
    const {
        setAuthKey,
        users,
        setLogIn,
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
        setCurrentUserFirstName,
        setCurrentUserLastName,
        setCurrentUserDescription,
    } = useContext(AppContext);

    useEffect(()=>{
        setIsRenderEmailError(false);
        setIsRenderPasswordError(false);
        setEmailErrorText('');
        setPasswordErrorText('');
        setInputValueEmail('');
        setInputValuePassword('');
    },[])

    const navigate = useNavigate();
    const logIn = useCallback(async(email, password)=>{
        const user = {
            email: email,
            password: password
        }
        if(!user.email || !user.password){
            return
        }
        try {
            const {data} = await axios.post('http://localhost:5001/auth/login', user, {withCredentials:true})
            navigate('/AllArticles', {replace: true});
            console.log(data);
            Cookies.set('token', data.token);
            setAuthKey(Cookies.get('token'));
        }catch (e) {
            setEmailErrorText(e.response.data.message);
            setPasswordErrorText(e.response.data.message);
            setIsRenderEmailError(true);
            setIsRenderPasswordError(true);
        }
    },[inputValueEmail, inputValuePassword] )



    const userLogIn = useCallback((email, password) => {
        users.forEach(user => {
            if (user.email === email && user.password === password) {
                setLogIn((logIn) => !logIn);
                navigate('/AllArticles');
                setAuthKey(user.userId);
                localStorage.setItem('authKey', JSON.stringify(user.userId));
                setCurrentUserFirstName(user.firstname);
                setCurrentUserLastName(user.lastname);
                setCurrentUserDescription(user.description);
            }
            else{
                setIsRenderEmailError(true);
                setEmailErrorText('Incorrect Email or password');
                setIsRenderPasswordError(true);
                setPasswordErrorText('Incorrect Email or password');
            }
        });
        if(!!users){
            setIsRenderEmailError(true);
            setEmailErrorText('Incorrect Email or password');
            setIsRenderPasswordError(true);
            setPasswordErrorText('Incorrect Email or password');
        }
    }, [inputValueEmail, inputValuePassword, users])

    const isCorrectEmail = useCallback(()=>{
        setIsRenderEmailError(true)
        setEmailErrorText('Please enter Email')
        if(regExpForEmail.test(inputValueEmail)){
            setIsRenderEmailError(false);
        }
        if(inputValueEmail !== '' && !regExpForEmail.test(inputValueEmail)){
            setIsRenderEmailError(true)
            setEmailErrorText('Please enter correct Email')
        }
    }, [inputValueEmail])

    const isEnterPassword = useCallback(()=>{
        if(!inputValuePassword){
            setIsRenderPasswordError(true)
            setPasswordErrorText('Please enter password')
        }
        setIsRenderPasswordError(false);
    }, [inputValuePassword])

    return (
        <div className={logInPageStyles.container}>
            <div className={logInPageStyles.block}>
                <h2 className={logInPageStyles.header}>Log in to your account</h2>
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
                    focusEvent={()=>setIsRenderEmailError(false)}
                />
                <Input
                    name='password'
                    placeholder='Enter your password...'
                    label='Password'
                    type='password'
                    inputValue={inputValuePassword}
                    changeValue={setInputValuePassword}
                    isRenderError={isRenderPasswordError}
                    errorText={passwordErrorText}
                    blurHandle={isEnterPassword}
                    focusEvent={()=>setIsRenderPasswordError(false)}
                />
                <Button style={buttonStyles.form_button} title='Log in' click={()=>logIn(inputValueEmail, inputValuePassword)}/>
                <p className={logInPageStyles.create_account_link}>
                    Don’t have a Times account?
                    <Link to='/SignIn' className={logInPageStyles.link}>Create one</Link>
                </p>
            </div>
        </div>
    )
}