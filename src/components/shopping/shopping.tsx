import "./style.css";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hook";
import Sorting from "./sorting";
import Pagination from "./pagination";
import ProductList from "./productList";
import { setUserName, setToken } from "../../redux/slices/userSlice";
import { setTotal } from "../../redux/slices/paginationSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { fetchCart } from "../../redux/slices/cartSlice";

function Shopping() {
  async function getTotalProducts() {
    let getTotal = fetch(`http://localhost:8001/page`)
      .then((res) => {
        return res.json();
      })
      .then((total) => {
        return total;
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
    return await getTotal;
  }
  const pages = useAppSelector((state) => state.pagination);
  const sorting = useAppSelector((state) => state.sorting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTotal = async () => {
      const total = await getTotalProducts();
      if (total) {
        dispatch(setTotal(total));
      }
    };
    getTotal();
  }, [pages.total]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: pages.currentPage,
        limit: pages.limitOnPage,
        sortField: sorting.field,
        sortDir: sorting.direction,
      })
    );
  }, [pages, sorting]);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.value.token && window.localStorage.getItem("token")) {
      dispatch(setUserName(window.localStorage.getItem("userName")));
      dispatch(setToken(window.localStorage.getItem("token")));
    }
  }, []);

  useEffect(() => {
    if (user.value.token) dispatch(fetchCart(user.value.token));
  }, [user]);

  return (
    <>
      {<Sorting />}
      {<Pagination />}
      {<ProductList />}
      {<Pagination />}
    </>
  );
}

export default Shopping;
