import useSWR from 'swr'

export type CharacterDetail = {
  id: string
  name: string
  image: string
  species: string
  status: string
  gender: string
  origin: { name: string }
  location: { name: string }
  episode: string[]
}

const fetcher = (url: string) => fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error('Error al cargar los datos')
    }
    return res.json()
  })

export function useCharacterDetail(characterId: string | null) {
  const { data, error, isLoading } = useSWR<CharacterDetail>(
    characterId ? `https://rickandmortyapi.com/api/character/${characterId}` : null,
    fetcher
  )

  return {
    data,
    error: error ? 'Error al cargar el personaje' : null,
    isLoading
  }
} 