import {NavLink} from 'react-router-dom';
import {Button} from '../Button/Button';
import styles from './LogInMenu.module.css';


export const LogInMenu = ({login, style}) => {

    const active = ({isActive}) =>{

    }

    return (
        <nav className={styles.logout}>
            <ul className={styles.logout_list}>
                <li><NavLink className={nav =>nav.isActive? styles.active : styles.logout_li} to='./AllArticles'>All articles</NavLink></li>
                <li><NavLink className={nav =>nav.isActive? styles.active : styles.logout_li} to='./MyArticles'>My articles</NavLink></li>
                <li><NavLink className={nav =>nav.isActive? styles.active : styles.logout_li} to='./AddArticle'>Add article</NavLink></li>
                <li><NavLink className={nav =>nav.isActive? styles.active : styles.logout_li} to='./Profile'>Profile</NavLink></li>
            </ul>
            <Button click={login} style={style} title='LogOut' disabled={false}/>
        </nav>
    );
}