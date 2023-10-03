import { useEffect, useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorite') || '[]'));
  }, []);
  function removeFavorite(character: any) {
    const clone = JSON.parse(localStorage.getItem('favorite') || '[]');
    const removedIndex = clone.findIndex(
      (item: any) => item.name === character.name
    );
    clone.splice(removedIndex, 1);
    localStorage.setItem('favorite', JSON.stringify(clone));
    setFavorites(clone);
  }
  return (
    <div>
      <h1>Favorite characters</h1>
      {favorites.map((item: any, index) => (
        <div key={index}>
          <div>{item.name}</div>
          <button onClick={() => removeFavorite(item)}>
            Удалить из избранного
          </button>
        </div>
      ))}
    </div>
  );
}
