import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../Button/Button';

export const LogOutMenu = ({stylesLogIn, stylesSignIn, login}) => {
    const navigate = useNavigate();
    const followLogInPage = useCallback(()=>{
        navigate('/LogIn')
    },[]);
    const followSignInPage = useCallback(()=>{
        navigate('/SignIn')
    },[]);
    return (
        <div>
            <Button title='Log in' style={stylesLogIn} click={followLogInPage} disabled={false}/>
            <Button title='Sign in' style={stylesSignIn} click={followSignInPage} disabled={false}/>
        </div>
    );
}