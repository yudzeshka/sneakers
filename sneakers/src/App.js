import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Favorites from "./components/Pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://61d3186eb4c10c001712b7b3.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://61d3186eb4c10c001712b7b3.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://61d3186eb4c10c001712b7b3.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://61d3186eb4c10c001712b7b3.mockapi.io/cart", obj);

    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://61d3186eb4c10c001712b7b3.mockapi.io/cart/${id}`);

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://61d3186eb4c10c001712b7b3.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://61d3186eb4c10c001712b7b3.mockapi.io/favorites",
          obj
        );

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };
  const onChangeSearshInput = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/favorites"
          exact
          element={<Favorites items={favorites} onFavorites={onFavorites} />}
        ></Route>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearshInput={onChangeSearshInput}
              onFavorites={onFavorites}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
