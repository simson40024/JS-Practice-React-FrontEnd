import { ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../hook";
import {
  decrement,
  increment,
  setPageValue,
} from "../../redux/slices/paginationSlice";

function Pagination() {
  const pages = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (
      +e.target.value >= 1 &&
      +e.target.value <= pages.total / pages.limitOnPage
    )
      dispatch(
        setPageValue({
          currentPage: +e.target.value,
          limitOnPage: pages.limitOnPage,
          total: pages.total,
        })
      );
  }

  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (pages.currentPage > 1) dispatch(decrement());
        }}
      >
        &lt;
      </button>
      <input
        id="page-number"
        value={pages.currentPage}
        onChange={handleOnChange}
      />
      <button
        onClick={() => {
          if (pages.currentPage < pages.total / pages.limitOnPage)
            dispatch(increment());
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
