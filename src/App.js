import {Routes, Route} from "react-router-dom";
import {useContext, useEffect} from 'react';
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {Header} from "./components/Header/Header";
import {LogInPage} from "./components/LogInPage/LogInPage";
import {SignInPage} from "./components/SignInPage/SignInPage";
import {AppContext} from './components/AppContext/AppContext';
import {FullArticlePage} from "./components/FullArticlePages/FullArticlePage";
import {articles} from "./mockStore/articles";

function App() {
    const {setUsers, users} = useContext(AppContext);
    useEffect(()=>{
        setUsers(JSON.parse(localStorage.getItem('users')) || []);
    }, []);

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/AllArticles' element={<Main/>}/>
                <Route path='/LogIn' element={<LogInPage/>}/>
                <Route path='/SignIn' element={<SignInPage/>}/>
                {articles.map(article => (
                    <Route
                        key={article.key}
                        path={`/AllArticles/${article.id}`}
                        element={<FullArticlePage article={article}/>}
                    />
                ))}
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
