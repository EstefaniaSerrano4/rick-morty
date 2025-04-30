import useSWR from 'swr'
import { useState } from 'react'

type Character = {
  id: string
  name: string
  image: string
  species: string
  status: string
}

type ApiResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

const fetcher = (url: string) => fetch(url)
  .then(r => r.json())

export function useCharacters() {
  const [page, setPage] = useState(1)
  
  const { data: apiResponse, error, isLoading } = useSWR<ApiResponse>(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    fetcher
  )

  const goToNextPage = () => {
    if (apiResponse?.info.next) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (apiResponse?.info.prev) {
      setPage(prevPage => prevPage - 1)
    }
  }

  return { 
    data: apiResponse?.results || [], 
    error: error ? 'Error al cargar los personajes' : null, 
    isLoading,
    pagination: {
      currentPage: page,
      totalPages: apiResponse?.info?.pages || 0,
      totalItems: apiResponse?.info?.count || 0,
      hasNextPage: Boolean(apiResponse?.info?.next),
      hasPrevPage: Boolean(apiResponse?.info?.prev),
      goToNextPage,
      goToPrevPage,
    }
  }
}