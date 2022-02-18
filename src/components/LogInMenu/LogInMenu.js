import { Link } from 'react-router-dom';
import {Button} from '../Button/Button';
import styles from './LogInMenu.module.css';


export const LogInMenu = ({active, login, style}) => {
    return (
        <nav className={styles.logout}>
            <ul className={styles.logout_list}>
                <li className={styles.logout_li}><Link to='./AllArticles'>All articles</Link></li>
                <li className={styles.logout_li}><Link to='./MyArticles'>My articles</Link></li>
                <li className={styles.logout_li}><Link to='./AddArticle'>Add article</Link></li>
                <li className={styles.logout_li}><Link to='./Profile'>Profile</Link></li>
            </ul>
            <Button click={login} style={style} title='LogOut' disabled={false}/>
        </nav>
    );
}