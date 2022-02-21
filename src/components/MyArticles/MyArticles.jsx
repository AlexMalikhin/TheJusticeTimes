import { useContext, useMemo, useEffect, useState } from 'react';
import { AppContext } from '../AppContext/AppContext';
import { Paggination } from '../Paggination/Paggination';
import { MyArticle } from '../MyArticle/MyArticle';
import styles from './MyArticles.module.css';
import defaultAvatar from '../../img/defaultAvatar.png';


export const MyArticles = () => {
    const { userArticlePage, setUserArticlePage, allArticles, authKey, users, setMyArticles} = useContext(AppContext);
    // const [ userData, setUserData ] = useState('');
    const currentUser = users.filter(user=> user.userId === authKey);
    // const myArticles = useMemo(()=>allArticles.filter(article=> article.userId === authKey), [authKey, allArticles])
    // setMyArticles(myArticles);

    return (
        <div className={styles.container}>
            <div className={styles.main_block}>
                <div className={styles.user_info}>
                    <img src={currentUser[0]?.avatar ? currentUser[0]?.avatar : defaultAvatar} className={styles.avatar}/>
                    <h3>{currentUser[0]?.firstname} {currentUser[0]?.lastname}</h3>
                    <p className={styles.p}>{currentUser[0]?.description}</p>
                </div>
                <div className={styles.articles_list}>
                    {/*{myArticles.map(article=> (*/}
                    {/*        <MyArticle props={article} key={article.id}/>*/}
                    {/*    )*/}
                    {/*)}*/}
                    {/*<Paggination*/}
                    {/*    page={userArticlePage}*/}
                    {/*    setPage={setUserArticlePage}*/}
                    {/*    allArticle={myArticles || ''}*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
    )
}