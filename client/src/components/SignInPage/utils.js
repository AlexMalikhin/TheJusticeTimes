import {useCallback, useContext} from "react";

export const isEmailEmpty = () => inputValueEmail === '';

export const useIsEmailTaken = ({users,inputValueEmail}) => {
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
    const abc = useCallback(()=>{
        regExpForEmail.test(inputValueEmail)
        return users.some(user => user.email === inputValueEmail)
    },[users, inputValueEmail])
    return {emailErrorText, setEmailErrorText, abc}
}