import { useCharacterDetail } from '../hooks/useCharacterDetail'

type FavoriteCharacterProps = {
  characterId: string | null
}

const FavoriteCharacter: React.FC<FavoriteCharacterProps> = ({ characterId }) => {
  const { data, error, isLoading } = useCharacterDetail(characterId)

  if (!characterId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center border border-gray-700 rounded-lg p-4">
          detalles
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border border-gray-700 rounded-lg">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-center">
        error
      </div>
    )
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={data.image} 
          alt={data.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-lg">{data.name}</h3>
      </div>

      <div className="p-4 space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400 mb-1">Especie</div>
            <div className="text-white">{data.species}</div>
          </div>
          
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400 mb-1">Estado</div>
            <div className={
              data.status === "Alive" ? "text-green-400" : 
              data.status === "Dead" ? "text-red-400" : "text-yellow-400"
            }>{data.status}</div>
          </div>
          
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400 mb-1">Género</div>
            <div className="text-white">{data.gender}</div>
          </div>
          
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400 mb-1">Episodios</div>
            <div className="text-white">{data.episode?.length || 0}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400 mb-1">Origen</div>
            <div className="text-white">{data.origin.name}</div>
          </div>
          
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400 mb-1">Ubicación</div>
            <div className="text-white">{data.location.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoriteCharacter 