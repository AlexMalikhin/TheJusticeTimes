import {Routes, Route} from "react-router-dom";
import {useContext, useEffect} from 'react';
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
import Cookies from 'js-cookie';
import axios from "axios";

function App() {
    const {authKey, setAuthKey, setAllArticles, allArticles, setMyArticles, myArticles, logIn} = useContext(AppContext);
    useEffect(async()=>{
        console.log('hui app')
        const token = await Cookies.get('token')
        if(!token){
            return
        }
        await setAuthKey(token);
        const getAllArticles = await axios.get('http://localhost:5001/article/getAllArticles')
        setAllArticles(getAllArticles.data.message)
        const getMyArticles = await axios.post('http://localhost:5001/article/getMyArticles', {token: token})
        setMyArticles(getMyArticles.data.message)
    },[])

    return (
        <div className="App">
            <Header/>

            <Routes>
                {authKey && <Route path='/AddArticle' element={<AddArticle/>}/>}
                <Route path='/MyArticles' element={<MyArticles/>}/>
                {allArticles.length > 0 && <Route path='/AllArticles' element={<Main/>}/>}
                <Route path='/LogIn' element={<LogInPage/>}/>
                <Route path='/SignIn' element={<SignInPage/>}/>
                {authKey && <Route path='/Profile' element={<ProfilePage/>}/>}
                {allArticles?.map(article => (
                    <Route
                        key={article._id}
                        path={`/AllArticles/${article._id}`}
                        element={<FullArticlePage article={article}/>}
                    />
                ))}
                {myArticles?.map(article =>(
                    <Route
                        key={article._id}
                        path={`/MyArticles/${article._id}`}
                        element={<FullArticlePage article={article}/>}
                    />
                ))}
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
