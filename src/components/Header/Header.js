import {useContext, useCallback} from "react";
import {LogInMenu} from '../LogInMenu/LogInMenu';
import {LogOutMenu} from '../LogOutMenu/LogOutMenu';
import {AppContext} from "../AppContext/AppContext";
import {Link} from "react-router-dom";
import logoBlack from "../../img/logo_black.png";
import styles from "./Header.module.css";
import buttonStyles from '../Button/Button.module.css';

export const Header = () => {
    const {logIn, setLogIn} = useContext(AppContext);
    const toggleLogIn = useCallback(() => {
        setLogIn((logIn) => !logIn);
    }, [logIn]);

    return (
        <header className={styles.header_container}>
            <div className={styles.app_header}>
                <Link to='AllArticles'><img className={styles.logo} src={logoBlack}/></Link>
                {logIn
                    ? <LogInMenu   login={toggleLogIn}
                               style={buttonStyles.header_logout}/>
                    : <LogOutMenu  stylesLogIn={buttonStyles.header_logIn}
                               stylesSignIn={buttonStyles.header_signIn}/>
                               // login={toggleLogIn}/>
                }
            </div>
        </header>
    );
}