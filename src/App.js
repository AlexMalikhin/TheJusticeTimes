import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {TopArticle} from "./components/TopArticle/TopArticle";
import {Header} from "./components/Header/Header";
import {Routes, Route} from "react-router-dom";
import {FullArticlePage} from "./components/FullArticlePages/FullArticlePage";

import {articles} from "./mockStore/articles";

function App() {
  return (
    <div className="App">


        <Header/>
        <Routes>
            <Route path='/AllArticles' element={<><TopArticle/><Main/></>}/>
            {articles.map(article =>(
                <Route path={`/AllArticles/${article.id}`} element={<FullArticlePage article={article}/>}/>
            ))}
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
