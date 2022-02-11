import logoWhite from "../../img/logo_white.png";
import {LogIn} from "../Header/LogIn/LogIn";
import {LogOut} from "../Header/LogOut/LogOut";
import {AppContext} from "../AppContext/AppContext";
import {useContext, useCallback} from "react";

export const Footer = () =>{
    const {logIn, setLogIn} = useContext(AppContext);
    const toggleLogIn = useCallback(()=>{
        setLogIn((logIn)=>!logIn);
    },[]);
    return(
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-nav">
                        <img src={logoWhite} width={268} height={32}/>
                        {logIn
                            ? <LogIn toggle={toggleLogIn} styles={'logInFooter'}/>
                            : <LogOut toggle={toggleLogIn} styles={'logInFooter'}/>}
                        {/*<nav>*/}
                        {/*    <button className="buttonLogIn">Log in</button>*/}
                        {/*    <button className="buttonSignIn">Sign in</button>*/}
                        {/*</nav>*/}
                    </div>
                    <div className='rights'>
                        <span className='right'>© 2021 Justice-it. All rights reserved.</span>
                        <span className='right'>© 2021 Justice-team. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </>
    );
}