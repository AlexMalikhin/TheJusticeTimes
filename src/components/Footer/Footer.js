import logoWhite from "../../img/logo_white.png";

export const Footer = () =>{
    return(
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-nav">
                        <img src={logoWhite} width={268} height={32}/>
                        <nav>
                            <button className="buttonLogIn">Log in</button>
                            <button className="buttonSignIn">Sign in</button>
                        </nav>
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