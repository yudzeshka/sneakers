import React from "react";

export default function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        <div className="items">
          {items.map((obj) => (
            <div key={obj.id} className="cartItem d-flex align-center">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5"> {obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img
                onClick={() => onRemove(obj.id)}
                className="removeBtn"
                src="/img/btn-remove.svg"
                alt="Remove"
              />
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого</span>
              <div></div>
              <b>21 498 руб</b>
            </li>
            <li>
              <span>Налог 5%</span>
              <div></div>
              <b>1874 руб</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ<img src="img/arrow.svg" alt="Arrow"></img>
          </button>
        </div>
      </div>
    </div>
  );
}
