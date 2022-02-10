import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {TopArticle} from "./components/TopArticle/TopArticle";
import {Header} from "./components/Header/Header";
import {articles} from "./mockStore/articles";

function App() {
  return (
    <div className="App">
        <Header/>
        <TopArticle/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
