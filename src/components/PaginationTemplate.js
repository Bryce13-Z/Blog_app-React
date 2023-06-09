import React from 'react'
import { Pagination } from '@mui/material'

const PaginationTemplate = ({ count, page, handleChangePage}) => {
  return (
    <Pagination size="large" count={count} page={page} onChange={(event, value)=> {handleChangePage(value)}} shape="rounded"/>
  )
}

export default PaginationTemplate