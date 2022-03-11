import React, { useCallback } from 'react'
import { Button } from '../Button/Button'
import paginationStyles from './Pagination.module.css'

interface PaginationProps {
  setPage: any
  page: any
  articlesLength: number
  type: keyof typeof paginationStyles
  countPerPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
  setPage,
  page,
  articlesLength,
  type,
  countPerPage,
}) => {
  const prevPage = useCallback(() => {
    setPage((page: number) => (page === 0 ? 0 : page - 1))
  }, [page])

  const nextPage = useCallback(() => {
    setPage((page: number) => page + 1)
  }, [page])

  const getResult = useCallback(() => {
    if (page === 0) {
      return page + countPerPage >= articlesLength
    }
    return (page + 1) * countPerPage - 1 >= articlesLength
  }, [articlesLength, page])

  return (
    <div className={paginationStyles[`${type}`]}>
      <Button
        click={prevPage}
        type={'header_logIn'}
        title="Prev"
        disable={page === 0}
      >
        Prev
      </Button>
      <Button
        click={nextPage}
        type={'header_logIn'}
        title="Next"
        disable={getResult()}
      >
        Next
      </Button>
    </div>
  )
}
