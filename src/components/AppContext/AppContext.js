import {createContext, useState} from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({children}) => {
    const regExpForEmail = new RegExp('^\\S+@\\S+\\.\\S+$');
    const regExpForPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$");

    const [currentPage, setCurrentPage] = useState(0);
    const [logIn, setLogIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [authKey, setAuthKey] = useState('');

    const [inputValueFirstName, setInputValueFirstName] = useState('');
    const [inputValueLastName, setInputValueLastName] = useState('');
    const [inputValueEmail, setInputValueEmail] = useState('');
    const [inputValuePassword, setInputValuePassword] = useState('');

    const [isRenderFirstnameError, setIsRenderFirstnameError] = useState(false);
    const [isRenderLastnameError, setIsRenderLastnameError] = useState(false);
    const [isRenderEmailError, setIsRenderEmailError] = useState(false);
    const [isRenderPasswordError, setIsRenderPasswordError] = useState(false);

    const [firstnameErrorText, setFirstnameErrorText] = useState('');
    const [lastnameErrorText, setLastnameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const [currentUserFirstName, setCurrentUserFirstName] = useState('');
    const [currentUserLastName, setCurrentUserLastName] = useState('');
    const [currentUserDescription, setCurrentUserDescription] = useState('');
    const [allArticles, setAllArticles] = useState([]);

    const [currentUser, setCurrentUser] = useState({});
    const [profileAvatar, setProfileAvatar] = useState('');
    const [myArticles, setMyArticles] = useState([]);

    return (
        <AppContext.Provider value={{
            regExpForEmail,
            regExpForPassword,

            currentPage,
            setCurrentPage,
            logIn,
            setLogIn,
            users,
            setUsers,
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

            profileAvatar,
            setProfileAvatar,
            myArticles,
            setMyArticles,
        }}>
            {children}
        </AppContext.Provider>);
}