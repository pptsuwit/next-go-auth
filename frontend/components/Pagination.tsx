import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
interface Pagination {
  pagination: IPagination;
  setCurrentPage: (page: IPagination) => void;
  sibling?: number;
}
export default function Pagination(props: Pagination) {
  let item = [];

  const activeBtnClass = "text-white bg-blue-700 border-blue-700";
  const inactiveBtnClass =
    "text-gray-500 bg-white border-gray-300 hover:bg-blue-700 hover:text-white";

  const startPage = 1;
  const maxLength = 9;
  const defaultRecordPerPage = 10;
  const defaultTotal = 0;
  const defaultRecord = 0;

  const sibling = (props.sibling ?? 2) + 1;
  const {
    currentPage = startPage,
    recordPerPage = defaultRecordPerPage,
    totalPage = defaultTotal,
    totalRecord = defaultRecord,
  } = props.pagination;

  const totalSib = totalPage - sibling;
  const totalSibCur = currentPage - totalSib;

  const handlePreviousPage = () => {
    if (currentPage === 1) return;

    // props.setCurrentPage(currentPage - 1);
    props.setCurrentPage({
      ...props.pagination,
      currentPage: currentPage - 1,
    });
  };
  const handleNextPage = () => {
    if (currentPage === totalPage) return;
    // props.setCurrentPage(currentPage + 1);
    props.setCurrentPage({
      ...props.pagination,
      currentPage: currentPage + 1,
    });
  };
  const handleCurrnetPage = (page: number) => {
    // props.setCurrentPage(page);
    props.setCurrentPage({
      ...props.pagination,
      currentPage: page,
    });
  };
  const getFirstPage = () => {
    let firstPage = 1;
    if (currentPage <= 2) firstPage = currentPage;
    else if (currentPage == 3) firstPage = currentPage - 1;
    else if (currentPage == 4) firstPage = currentPage - 2;
    else if (currentPage > 4 && currentPage < totalPage - sibling) {
      firstPage = currentPage - sibling;
    } else {
      if (totalSibCur === 0) {
        firstPage = currentPage - sibling - 1;
      } else if (totalSibCur === 1) {
        firstPage = currentPage - sibling - 2;
      } else if (totalSibCur === 2) {
        firstPage = currentPage - sibling - 3;
      } else if (totalSibCur === 3) {
        firstPage = currentPage - sibling - 4;
      }
    }

    if (totalPage <= maxLength && currentPage !== 1) firstPage = 2;
    return firstPage;
  };
  const getLastPage = () => {
    const totalCurSib = currentPage - (totalPage - sibling);
    let lastPage = totalPage - 1;

    if (currentPage <= 4) {
      let add = 1;
      if (currentPage === 1) add = 4;
      else if (currentPage === 2) add = 3;
      else if (currentPage === 3) add = 2;
      lastPage = currentPage + sibling + add;
    } else if (currentPage > 4 && currentPage < totalPage - sibling) {
      lastPage = currentPage + sibling;
    } else if (totalCurSib >= 0 || currentPage >= totalPage) {
      lastPage = totalPage - 1;
    }

    if (totalPage <= maxLength) lastPage = totalPage - 1;
    return lastPage;
  };
  const getSkipBtnPage = (page: number) => {
    const adjustTotalSib = totalPage - sibling - 1;

    if (totalPage <= maxLength) return false;

    if (currentPage <= 4 && page === getLastPage()) {
      return true;
    } else if (
      currentPage > 4 &&
      currentPage <= adjustTotalSib &&
      (page === getFirstPage() || page === getLastPage())
    ) {
      return true;
    } else if (currentPage >= adjustTotalSib && page === getFirstPage()) {
      return true;
    }

    return false;
  };

  for (let index = getFirstPage(); index <= getLastPage(); index++) {
    item.push(
      <li key={index}>
        {getSkipBtnPage(index) ? (
          <div className="w-12 text-center">....</div>
        ) : (
          <button
            onClick={() => handleCurrnetPage(index)}
            type="button"
            className={`font-medium rounded-full text-sm text-center inline-flex items-center mx-1 border
            xs:h-7 xs:w-7 md:h-10 md:w-10
           ${currentPage === index ? activeBtnClass : inactiveBtnClass}`}
          >
            <span className="overflow-ellipsis mx-auto">{index}</span>
          </button>
        )}
      </li>
    );
  }

  return (
    <>
      {totalPage > 0 && (
        <nav className="flex justify-center my-4 ">
          <ul className="flex items-center -space-x-px h-10 text-base float-left">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                type="button"
                className={`bg-white font-medium rounded-full text-sm flex items-center justify-center xs:h-7 xs:w-7 md:h-10 md:w-10 mx-1 border 
              ${
                currentPage === 1
                  ? "text-gray-300 border-gray-300 "
                  : "text-gray-700 border-gray-300 hover:bg-blue-700 hover:text-white"
              } 
              `}
              >
                <span className="sr-only">Previous</span>
                <AiOutlineLeft fontSize={16} />
              </button>
            </li>
            {currentPage !== 1 && (
              <li>
                <button
                  disabled={currentPage === 1}
                  onClick={() => handleCurrnetPage(1)}
                  type="button"
                  className={`bg-white font-medium rounded-full text-sm flex items-center justify-center xs:h-7 xs:w-7 md:h-10 md:w-10 mx-1 border 
              ${
                currentPage === 1
                  ? "text-gray-300 border-gray-300 "
                  : "text-gray-700 border-gray-300 hover:bg-blue-700 hover:text-white"
              } 
              `}
                >
                  <span className="sr-only">First</span>
                  <span className="overflow-ellipsis mx-auto">1</span>
                </button>
              </li>
            )}
            {item}
            <li>
              <button
                onClick={() => handleCurrnetPage(totalPage)}
                disabled={currentPage === totalPage}
                type="button"
                className={`font-medium rounded-full text-sm flex items-center justify-center xs:h-7 xs:w-7 md:h-10 md:w-10 mx-1 border 
              ${currentPage === totalPage ? activeBtnClass : inactiveBtnClass} 
              `}
              >
                <span className="overflow-ellipsis mx-auto">{totalPage}</span>
                <span className="sr-only">Last</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPage}
                type="button"
                className={`bg-white font-medium rounded-full text-sm flex items-center justify-center xs:h-7 xs:w-7 md:h-10 md:w-10 mx-1 border 
              ${
                currentPage === totalPage
                  ? "text-gray-300 border-gray-300 "
                  : "text-gray-500 border-gray-300 hover:bg-blue-700 hover:text-white"
              } 
              `}
              >
                <AiOutlineRight fontSize={16} />
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
