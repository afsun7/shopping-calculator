import { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import Show from "./assets/component/Show";

function App() {
  const [product, setProduct] = useState([]);

  const [value, setValue] = useState({
    name: "",
    price: 0,
    count: 1,
    discount: 0,
  });

  const handelInput = (key, value) => {
    setValue((prev) => ({
      ...prev,
      [key]: value,
      id: Math.floor(Math.random() * 10000),
    }));
  };
  function handelAdd() {
    setProduct((prev) => [...prev, value]);
    console.log(product);
  }

  return (
    <div className="container">
      <div className="customer">
        <label htmlFor="name">name </label>
        <input
          name="name"
          type="text"
          onChange={(e) => handelInput("name", e.target.value)}
        ></input>
        <br />
        <label htmlFor="price">Price</label>
        <input
          name="price"
          type="number"
          onChange={(e) => handelInput("price", e.target.value)}
        ></input>
        <br />
        <label htmlFor="count">Count of product</label>
        <input
          name="count"
          type="number"
          onChange={(e) => handelInput("count", e.target.value)}
        ></input>
        <br />
        <label htmlFor="discount">Discount</label>
        <span>{value.discount}</span>
        <input
          name="discount"
          type="range"
          onChange={(e) => handelInput("discount", e.target.value)}
        ></input>

        <br />
        <button onClick={handelAdd}>Add Product</button>
      </div>

      <div className="showProducts">
        <Show product={product} setProduct={setProduct} />
      </div>
    </div>
  );
}

export default App;
