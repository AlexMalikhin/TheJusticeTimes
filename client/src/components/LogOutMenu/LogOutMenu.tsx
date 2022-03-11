import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from '../Button/Button';
import buttonStyles from '../Button/Button.module.css';

//
interface LogOutMenuProps {
  stylesLogIn: "header_logout" | "header_logIn" | "header_signIn" | "footer_logout" | "footer_signIn" | "footer_logIn" | "form_button" | "profile_save_changes" | "all_articles" | "category"
  stylesSignIn: "header_logout" | "header_logIn" | "header_signIn" | "footer_logout" | "footer_signIn" | "footer_logIn" | "form_button" | "profile_save_changes" | "all_articles" | "category"
}

export const LogOutMenu: React.FC<LogOutMenuProps> = ({
  stylesLogIn,
  stylesSignIn,
}) => {
  const navigate = useNavigate()

  const followLogInPage = () => {
    navigate('/LogIn')
  }
  const followSignInPage = () => {
    navigate('/SignIn')
  }

  return (
    <div>
      <Button
        title="Log in"
        type={stylesLogIn}
        click={followLogInPage}
        disable={false}
      />
      <Button
        title="Sign in"
        type={stylesSignIn}
        click={followSignInPage}
        disable={false}
      />
    </div>
  )
}
