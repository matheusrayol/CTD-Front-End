import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.page";
import BookmarksPage from "./pages/Bookmarks.page";
import CharacterDetails from "./pages/Details.page";
import Header from "./components/layout/header.component";
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/layout/footer.component';

function App() {
  return (
    <div className="App">
      <Provider store={store}>      
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="favoritos" element={<BookmarksPage />} />
          <Route path=":id" element={<CharacterDetails />} />
        </Routes>
        <Footer />
      </Provider>

    </div>
  );
}

export default App;
