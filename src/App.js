import {Routes, Route} from "react-router-dom";
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {TopArticle} from "./components/TopArticle/TopArticle";
import {Header} from "./components/Header/Header";
import {FullArticlePage} from "./components/FullArticlePages/FullArticlePage";
import {articles} from "./mockStore/articles";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/AllArticles' element={<Main/>}/>
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
