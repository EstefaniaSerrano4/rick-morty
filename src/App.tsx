import { useState } from 'react'
import CharacterList from './components/CharacterList'
import FavoriteCharacter from './components/FavoriteCharacter'
import { useCharacters } from './hooks/useCharacters'

function App() {
  const [favoriteCharacter, setFavoriteCharacter] = useState<string | null>(null)
  const { data, error, isLoading, pagination } = useCharacters()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-emerald-500 rounded mr-3"></div>
                <h2 className="text-xl font-bold">Personajes</h2>
              </div>
              <CharacterList 
                characters={data} 
                isLoading={isLoading} 
                error={error} 
                onSelectFavorite={setFavoriteCharacter}
                favoriteCharacter={favoriteCharacter}
                pagination={pagination}
              />
            </div>
          </div>
          <div>
            <div className="sticky top-4 border border-gray-700 rounded-lg p-6 bg-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
                <h2 className="text-xl font-bold">Detalles</h2>
              </div>
              <FavoriteCharacter 
                characterId={favoriteCharacter} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
