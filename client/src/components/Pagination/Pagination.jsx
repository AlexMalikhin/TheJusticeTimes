import { useCallback } from 'react'
import { Button } from '../Button/Button'
import paginationStyles from './Pagination.module.css'

export const Pagination = ({ setPage, page, allArticles, type, length }) => {
  const prevPage = useCallback(() => {
    setPage((page) => (page === 0 ? 0 : page - 1))
  }, [page])

  const nextPage = useCallback(() => {
    setPage((page) => page + 1)
  }, [page])

  const getResult = useCallback(() => {
    if (page === 0) {
      return page + length >= allArticles.length
    }
    return (page + 1) * length - 1 >= allArticles.length
  }, [allArticles, page])

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
