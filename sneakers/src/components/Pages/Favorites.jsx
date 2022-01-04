
import Card from "../Card"
function Favorites({ items, onFavorites}) {

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            Мои закладки
          </h1>
          
        </div>

        <div className="d-flex flex-wrap">
        {items.map((item, index) => (
              <Card
                key={item.index}
                favorited={true}
                onFavorite={onFavorites}
                {...item}
              />
            ))}
        </div>
      </div>
    )
}

export default Favorites