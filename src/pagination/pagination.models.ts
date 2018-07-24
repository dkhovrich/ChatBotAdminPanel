export interface IPagination<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  content: T[];
}
