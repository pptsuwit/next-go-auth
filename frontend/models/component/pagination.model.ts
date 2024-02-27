// interface IPagination {
//   page?: string;
//   pageSize?: string;
//   totalPage?: number;
// }

interface IPagination {
  recordPerPage?: number;
  currentPage?: number;
  totalPage?: number;
  totalRecord?: number;
}
interface IPage {
  currentPage?: number;
  recordPerPage?: number;
}
