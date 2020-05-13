import React from "react";

const UserProductBlock = ({
  products,
  removeItem,
  updateQuantity,
  outOfStock,
}) => {
  const renderCartimage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/noimage.png";
    }
  };

  const renderItems = () =>
    products.cartDetail
      ? products.cartDetail.map((product) => (
          <div className="user_product_block" key={product._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderCartimage(
                    product.images
                  )}) no-repeat`,
                }}
              ></div>
            </div>
            <div className="item">
              <h4>Item</h4>
              <div classname="No_stock">
                {product.name}{" "}
                {product._id in outOfStock ? <p>This item is currently unavailable</p> : null}
              </div>
            </div>
            <div className="item">
              <h4>Quantity</h4>
              <div>
                <div className="quantity">
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(e.target.value, product)}
                  />
                </div>
              </div>
            </div>
            <div className="item">
              <h4>Price</h4>
              <div>£ {product.price}</div>
            </div>
            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(product._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{renderItems()}</div>;
};

export default UserProductBlock;
