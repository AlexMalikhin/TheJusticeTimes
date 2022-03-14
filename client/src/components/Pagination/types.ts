export interface PaginationProps {
  setPage: any
  page: any
  articlesLength: number | undefined
  type: 'allArticles' | 'myArticles'
  countPerPage: number
}
