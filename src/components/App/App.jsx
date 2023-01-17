//import logo from './logo.svg';

import { useState, useEffect } from 'react';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Sort from '../Sort/Sort';
import './App.css';
import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo/SeachInfo.jsx';

function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  

  const handleInput = (e) => {
    const filterCards = data.filter((item) =>
      item.name.toUpperCase().includes(searchQuery.toUpperCase())
    );
    setCards([...filterCards]);
  };

  useEffect(() => {
    handleInput();

  }, [searchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleInput();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };
  return (
    <>
      <Header 
      changeInput = {(e)=>{
        console.log(e.target.value);
        }}>
        <>
          <Logo className='logo logo_place_header' href='/' />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchText={searchQuery} searchCount={cards.length}  />
        <Sort />
        <div className='content__cards'>
          <CardList goods={cards} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;