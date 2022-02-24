import {useContext, useMemo} from 'react';
import { AppContext } from '../AppContext/AppContext';
import { Paggination } from '../Paggination/Paggination';
import pagginationStyles from '../Paggination/Paggination.module.css';
import { MyArticle } from '../MyArticle/MyArticle';
import styles from './MyArticles.module.css';
import defaultAvatar from '../../img/defaultAvatar.png';


export const MyArticles = () => {
    const { userArticlePage, setUserArticlePage, authKey, users, myArticles} = useContext(AppContext);
    const slicedMyArticles = useMemo(() => myArticles.slice(userArticlePage * 4, userArticlePage * 4 + 4), [userArticlePage, myArticles])
    const currentUser = users.filter(user=> user.userId === authKey);


    return (
        <div className={styles.container}>
            <div className={styles.main_block}>
                <div className={styles.user_info}>
                    <img src={currentUser[0]?.avatar ? currentUser[0]?.avatar : defaultAvatar} className={styles.avatar}/>
                    <h3>{currentUser[0]?.firstname} {currentUser[0]?.lastname}</h3>
                    <p className={styles.p}>{currentUser[0]?.description}</p>
                </div>
                <div className={styles.articles_list}>
                    {slicedMyArticles   .map(article=> (
                            <MyArticle props={article} key={article.id}/>
                        )
                    )}
                    <Paggination
                        page={userArticlePage}
                        setPage={setUserArticlePage}
                        allArticles={myArticles || ''}
                        style={pagginationStyles.myArticles}
                        length={4}
                    />
                </div>
            </div>
        </div>
    )
}