import { Empty } from "antd";
import { Button, Modal } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
export default function Show({ product, setProduct }) {
  const [getId, setGetid] = useState(null);
  const [inputEdit, setInputEdit] = useState({
    nameEdit: "",
    priceEdit: 0,
    countEdit: 1,
    discountEdit: 0,
  });
  const handelEditinput = (key, value) => {
    setInputEdit((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log(inputEdit);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handelDelete(id) {
    setProduct(
      product.filter((item) => {
        return item.id !== id;
      })
    );
  }
  function showModal(id) {
    setIsModalOpen(true);
    setGetid(id);
  }

  function handelEdit() {
    product.find((item) => {
      if (item.id === getId) {
        item.name = inputEdit.nameEdit;
        item.price = inputEdit.priceEdit;
        item.count = inputEdit.countEdit;
        item.discount = inputEdit.discountEdit;

        console.log(item);
      }
    });
    setProduct([...product]);
  }

  function totalPrice(list) {
    return Object.keys(list).reduce((prev, curr) => {
      prev += parseInt(list[curr].price * list[curr].count);
      return prev;
    }, 0);
  }

  function totalPayment(product) {
    return Object.keys(product).reduce((prev, curr) => {
      prev += parseFloat(
        product[curr].price * product[curr].count -
          (product[curr].price * product[curr].count * product[curr].discount) /
            100
      );
      return prev;
    }, 0);
  }

  return (
    <>
      {product.length ? (
        product.map((item, index) => (
          <div className="showProduct" key={`${index}`}>
            <div className="showMenu">
              <label htmlFor="name">name</label>
              <div className="name">{item.name}</div>
            </div>
            <div className="showMenu">
              <label htmlFor="pric">pric</label>
              <div className="pric">{item.price * item.count}</div>
            </div>
            <div className="showMenu">
              <label htmlFor="Count">Count</label>
              <div className="Count">
                {item.count}
                <span> X</span>
              </div>
            </div>
            <div className="showMenu">
              <label htmlFor="Discount">Discount</label>
              <div className="Discount">
                {item.discount}
                <span> %</span>
              </div>
            </div>
            <div className="showMenu">
              <label htmlFor="FinalPrice">Final Price</label>
              <div className="FinalPrice">
                {item.price * item.count -
                  (item.price * item.count * item.discount) / 100}
              </div>
            </div>
            <div className="showButton">
              <button onClick={() => showModal(item.id)}>
                <EditFilled style={{ fontSize: "14px" }} />
              </button>
              <button onClick={() => handelDelete(item.id)}>
                <DeleteFilled style={{ fontSize: "14px" }} />
              </button>

              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="customerEdit">
                  <label htmlFor="nameEdit">name </label>
                  <input
                    name="nameEdit"
                    type="text"
                    onChange={(e) =>
                      handelEditinput("nameEdit", e.target.value)
                    }
                  ></input>
                  <br />
                  <label htmlFor="priceEdit">Price</label>
                  <input
                    name="priceEdit"
                    type="number"
                    onChange={(e) =>
                      handelEditinput("priceEdit", e.target.value)
                    }
                  ></input>
                  <br />
                  <label htmlFor="countEdit">Count of product</label>
                  <input
                    name="countEdit"
                    type="number"
                    onChange={(e) =>
                      handelEditinput("countEdit", e.target.value)
                    }
                  ></input>
                  <br />
                  <label htmlFor="discountEdit">Discount</label>
                  <input
                    name="discountEdit"
                    type="range"
                    onChange={(e) =>
                      handelEditinput("discountEdit", e.target.value)
                    }
                  ></input>
                  <button onClick={handelEdit}>Edit</button>
                </div>
              </Modal>
            </div>
          </div>
        ))
      ) : (
        <div className="showProduct">
          <Empty />
        </div>
      )}
      {product && (
        <div className="showTotals">
          <div className="showTotal">
            <label>Total Price :</label>
            <div>{totalPrice(product)}</div>
          </div>
          <div className="showTotal">
            <label>Total discount :</label>
            <div>
              {product.length
                ? Math.round(
                    ((totalPrice(product) - totalPayment(product)) /
                      totalPrice(product)) *
                      100
                  )
                : 0}
              %
            </div>
          </div>
          <div className="showTotal" style={{ color: "blue" }}>
            <label>Total Payment :</label>
            <div>{totalPayment(product)}</div>
          </div>
        </div>
      )}
    </>
  );
}
