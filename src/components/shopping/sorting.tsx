import { ChangeEvent } from "react";
import { useAppDispatch } from "../../hook";
import { setLimitOnPage } from "../../redux/slices/paginationSlice";
import { setSorting } from "../../redux/slices/sortingSlice";

function Sorting() {
  const dispatch = useAppDispatch();

  function handleChangeSort(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.id) {
      case "sort-by-product":
        document
          .querySelector("#sort-by-price > option[selected]")
          ?.removeAttribute("selected");
        document
          .querySelector("#sort-by-price > option[value='-']")
          ?.setAttribute("selected", "selected");

        if (e.target.value === "-")
          dispatch(setSorting({ field: "", direction: "" }));
        else dispatch(setSorting({ field: "name", direction: e.target.value }));
        break;
      case "sort-by-price":
        document
          .querySelector("#sort-by-product > option[selected]")
          ?.removeAttribute("selected");
        document
          .querySelector("#sort-by-product > option[value='-']")
          ?.setAttribute("selected", "selected");
        if (e.target.value === "-")
          dispatch(setSorting({ field: "", direction: "" }));
        else
          dispatch(setSorting({ field: "price", direction: e.target.value }));
        break;
    }
  }
  return (
    <div className="sorting">
      <div className="sorting-name">
        by product:
        <select
          name="sort-by-product"
          id="sort-by-product"
          onChange={handleChangeSort}
          defaultValue="-"
        >
          <option value="-">-</option>
          <option value="increase">increase</option>
          <option value="decrease">decrease</option>
        </select>
      </div>
      <div className="sorting-name">
        by price:
        <select
          name="sort-by-price"
          id="sort-by-price"
          onChange={handleChangeSort}
          defaultValue="-"
        >
          <option value="-">-</option>
          <option value="increase">increase</option>
          <option value="decrease">decrease</option>
        </select>
      </div>
      <div className="product-on-page">
        amount on page:
        <select
          name=""
          id=""
          onChange={(e) => {
            dispatch(setLimitOnPage(Number(e.target.value)));
          }}
          defaultValue="10"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
}

export default Sorting;
