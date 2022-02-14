import {ButtonLog} from '../ButtonLog/ButtonLog';



export const LogOut = ({stylesLogIn, stylesSignIn, login}) => {
    return (
        <nav>
            <ButtonLog title='Log in' style={stylesLogIn} click={login} disabled={false}/>
            <ButtonLog title='Sign in' style={stylesSignIn} disabled={false}/>
        </nav>
    );
}