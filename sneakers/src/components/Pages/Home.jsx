import Card from "../Card";

function Home({items,cartItems,
    searchValue,
    setSearchValue,
    onChangeSearshInput,
    onFavorites,
    onAddToCart,}) {

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue
              ? `Поиск по запросу "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearshInput}
              value={searchValue}
              placeholder="Поиск...."
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Remove"
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.title}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onFavorites(obj)}
                added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
                {...item}
              />
            ))}
        </div>
      </div>
    )
}

export default Home