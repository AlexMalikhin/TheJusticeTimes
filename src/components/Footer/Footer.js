import {useContext, useCallback} from "react";
import {LogIn} from "../LogIn/LogIn";
import {LogOut} from "../LogOut/LogOut";
import {AppContext} from "../AppContext/AppContext";
import logoWhite from "../../img/logo_white.png";
import styles from "./Footer.module.css";
import buttonStyles from '../ButtonLog/ButtonLog.module.css';

export const Footer = () => {
    const {logIn, setLogIn} = useContext(AppContext);
    const toggleLogIn = useCallback(() => {
        setLogIn((logIn) => !logIn);
    }, []);
    return (
        <footer>
            <div className={styles.footer_container}>
                <div className={styles.footer_nav}>
                    <img className={styles.logo} src={logoWhite}/>
                    {logIn
                        ? <LogIn login={toggleLogIn} style={buttonStyles.footer_logout}/>
                        : <LogOut
                            login={toggleLogIn}
                            stylesSignIn={buttonStyles.footer_signIn}
                            stylesLogIn={buttonStyles.footer_logIn}
                        />
                    }
                </div>
                <div className={styles.rights}>
                    <span>© 2021 Justice-it. All rights reserved.</span>
                    <span>© 2021 Justice-team. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}