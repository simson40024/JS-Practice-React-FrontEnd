import Product from "./product";
import { useAppSelector } from "../../hook";
import { product } from "../../redux/slices/productSlice";

function ProductList() {
  const productList = useAppSelector((state) => state.product);

  return (
    <>
      {productList.status === "loading" && (
        <div className="loading">loading...</div>
      )}
      {productList.error && <div className="loading">loading error</div>}
      <div className="product-list">
        {productList.products.map((product: product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            imgUrl={product.imgUrl}
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;
