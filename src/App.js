import {Routes, Route} from "react-router-dom";
import {useContext, useEffect, useMemo} from 'react';
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {Header} from "./components/Header/Header";
import {LogInPage} from "./components/LogInPage/LogInPage";
import {SignInPage} from "./components/SignInPage/SignInPage";
import {AppContext} from './components/AppContext/AppContext';
import {ProfilePage} from './components/ProfilePage/ProfilePage';
import {FullArticlePage} from "./components/FullArticlePages/FullArticlePage";
import {AddArticle} from "./components/AddArticle/AddArticle";
import {MyArticles} from "./components/MyArticles/MyArticles";

function App() {
    const {setUsers, authKey, setAuthKey, setAllArticles, allArticles, setMyArticles} = useContext(AppContext);
    const myArticles = useMemo(()=>allArticles.filter(article=> article.userId === authKey), [authKey, allArticles])
    useEffect(()=>{
        setUsers(JSON.parse(localStorage.getItem('users')) || []);
        setAuthKey(JSON.parse(localStorage.getItem('authKey')) || '');
        setAllArticles(JSON.parse(localStorage.getItem('articles')) || []);
    },[])
    useEffect(()=>{
        setMyArticles(myArticles);
    },[myArticles])

    return (
        <div className="App">
            <Header/>
            <Routes>
                {authKey && <Route path='/AddArticle' element={<AddArticle/>}/>}
                {myArticles.length > 0 && <Route path='/MyArticles' element={<MyArticles/>}/>}
                {allArticles.length > 0 && <Route path='/AllArticles' element={<Main/>}/>}
                <Route path='/LogIn' element={<LogInPage/>}/>
                <Route path='/SignIn' element={<SignInPage/>}/>
                {authKey && <Route path='/Profile' element={<ProfilePage/>}/>}
                {allArticles.map(article => (
                    <Route
                        key={article.id}
                        path={`/AllArticles/${article.id}`}
                        element={<FullArticlePage article={article}/>}
                    />
                ))}
                {myArticles.map(article =>(
                    <Route
                        key={article.id}
                        path={`/MyArticles/${article.id}`}
                        element={<FullArticlePage article={article}/>}
                    />
                ))}
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
