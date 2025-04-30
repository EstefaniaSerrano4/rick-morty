import React from 'react'

type Character = {
  id: string
  name: string
  image: string
  species: string
  status: string
}

type PaginationControls = {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
  goToNextPage: () => void
  goToPrevPage: () => void
}

type CharacterListProps = {
  characters: Character[]
  isLoading: boolean
  error: string | null
  onSelectFavorite: (id: string) => void
  favoriteCharacter: string | null
  pagination: PaginationControls
}

const CharacterList: React.FC<CharacterListProps> = ({ 
  characters, 
  isLoading, 
  error, 
  onSelectFavorite,
  favoriteCharacter,
  pagination
}) => {
  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
    </div>
  )
  
  if (error) return (
    <div className="flex items-center justify-center h-64 text-center">
      <div>
        <p className="text-red-500 text-lg mb-2">😕 {error}</p>
        <p className="text-gray-400">Intenta recargar la página</p>
      </div>
    </div>
  )

  const { currentPage, totalPages, goToNextPage, goToPrevPage, hasNextPage, hasPrevPage } = pagination

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {characters.map(character => (
          <div 
            key={character.id} 
            className={`relative overflow-hidden rounded-lg cursor-pointer ${favoriteCharacter === character.id ? 'ring-2 ring-blue-500' : 'border border-gray-700'}`}
            onClick={() => onSelectFavorite(character.id)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-48 object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-white">
              <h3 className="font-bold">{character.name}</h3>
              <div className="flex mt-1">
                <span className="text-xs px-2 py-1 mr-2 bg-gray-800 rounded-full">{character.species}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  character.status === "Alive" ? "bg-green-900 text-green-300" : 
                  character.status === "Dead" ? "bg-red-900 text-red-300" : 
                  "bg-yellow-900 text-yellow-300"
                }`}>
                  {character.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={goToPrevPage}
          disabled={!hasPrevPage}
          className={`p-2 rounded-full ${hasPrevPage ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="mx-4 px-3 py-1 bg-gray-800 rounded-full text-sm">
          {currentPage} / {totalPages}
        </div>
        
        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          className={`p-2 rounded-full ${hasNextPage ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default CharacterList 