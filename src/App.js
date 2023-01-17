import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './index.css';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { ProductPage } from '../../pages/product/product';
import { CatalogPage } from '../../pages/catalog/catalog';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NoMatchFound } from '../../pages/NoMatchFound/NoMatchFound';
// import useDebounce from '../../hooks/useDebounce';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState(false);

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const handleRequest = () => {
    // const filterCards = cards.filter((item) =>
    //   item.name.toUpperCase().includes(searchQuery.toUpperCase())
    // );
    // setCards(filterCards);

    api
      .search(searchQuery)
      .then((res) => setCards(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleRequest();
    console.log('INPUT', searchQuery);
  }, [debounceSearchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    Promise.all([api.getProductsList(), api.getUserInfo()]).then(
      ([productsData, userData]) => {
        setCards(productsData.products);
        setCurrentUser(userData);
      }
    );
    // api.getProductsList().then((data) => setCards(data.products));
    // api.getUserInfo().then((userData)=>setCurrentUser(userData))
  }, []);

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  }
  function handleProductLike(product) {
    const liked = product.likes.some((id) => id === currentUser?._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        console.log('Карточка из стейта', cardState);
        console.log('Карточка из сервера', newCard);
        return cardState._id === newCard._id ? newCard : cardState;
      });
      setCards(newProducts);
    });
  }

  console.log(window);

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className='logo logo_place_header' href='/' />
          <Routes>
            <Route
              path='/'
              element={
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              }
            ></Route>
          </Routes>
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />

        <Routes>
          <Route
            path='/'
            element={
              <CatalogPage
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike}
              />
            }
          ></Route>
          <Route path='/product/:productId' element={<ProductPage />}></Route>
          <Route
            path='/custom'
            element={<div>MY CUSTOM COMPONENT</div>}
          ></Route>
          <Route path='/custom2' element={<h1>MY NEW COMPONENT</h1>}></Route>
          <Route path='*' element={<NoMatchFound />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;