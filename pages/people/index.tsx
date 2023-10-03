'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './People.module.scss';
import Search from '@/app/components/Search/Search';
import Link from 'next/link';
import { useFavoriteContext } from '@/context';
export default function People() {
  const [people, setPeople] = useState([]);
  //const [favorite, setFavorite] = useState([]);
  const { favorite, setFavorite } = useFavoriteContext();
  useEffect(() => {
    axios
      .get('https://swapi.dev/api/people')
      .then(({ data }) => {
        console.log(data);
        setPeople(data.results);
      })
      .catch((err) => console.log(err));
  });

  interface ICharacter {
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    url: string;
  }

  function addToFovorite(character: ICharacter) {
    setFavorite(JSON.parse(localStorage.getItem('favorite') || '[]'));
    const clone: object[] = [...favorite];
    clone.push(character);
    localStorage.setItem('favorite', JSON.stringify(clone));
    // setFavorite(clone)
    setFavorite(JSON.parse(localStorage.getItem('favorite') || '[]'));
  }

  function removeFromFavorite(character: ICharacter) {
    const clone = JSON.parse(localStorage.getItem('favorite') || '[]');
    const removedIndex = clone.findIndex(
      (item: any) => item.name === character.name
    );
    clone.splice(removedIndex, 1);
    localStorage.setItem('favorite', JSON.stringify(clone));
  }
  function isInFavorite(character: ICharacter) {
    return (
      JSON.parse(localStorage.getItem('favorite') || '[]').findIndex(
        (item: any) => item.name === character.name
      ) !== -1
    );
  }

  function proceedFavorite(character: ICharacter) {
    const isFavorite = isInFavorite(character);
    console.log(isFavorite);
    if (isFavorite) {
      removeFromFavorite(character);
    } else {
      addToFovorite(character);
    }
  }
  //item in 'favorite'
  return (
    <div>
      <h1>People</h1>
      <Search />
      <div>
        {people.map((item: any, index) => (
          <div key={index} className={style.flex}>
            <Link
              href={`/people/${item.url.split('/')[5]}`}
              className={style.flex__link}
            >
              <span>{item.name}</span>
              <span>{item.height}</span>
              <span>{item.mass}</span>
              <span>{item.hair_color}</span>
            </Link>
            {
              <button
                onClick={() => proceedFavorite(item)}
                className={style.btn}
              >
                {isInFavorite(item)
                  ? 'Удалить из избранного'
                  : 'Добавить в избранное'}
              </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
