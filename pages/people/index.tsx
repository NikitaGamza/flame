import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './People.module.scss';
import Search from '@/app/components/Search/Search';
import Link from 'next/link';
export default function People() {
  const [people, setPeople] = useState([]);
  const [favorite, setFavorite] = useState();
  useEffect(() => {
    axios
      .get('https://swapi.dev/api/people')
      .then(({ data }) => {
        console.log(data);
        setPeople(data.results);
      })
      .catch((err) => console.log(err));
  });

  function btnFovorite(url: string) {
    // const index = favorite.indexOf(url);
    // const copyFavorite = [...favorite];
    // if (index > -1) {
    //   copyFavorite.splice(index, 1);
    // } else {
    //   copyFavorite.push(url);
    // }
    // setFavorite(copyFavorite);
    // localStorage.setItem('favorite', favorite);
  }

  return (
    <div>
      <h1>People</h1>
      <Search />
      <div>
        {people.map((item: any, index) => (
          <Link
            href={`/people/${item.url.split('/')[5]}`}
            className={style.flex}
            key={index}
          >
            <p>{item.name}</p>
            <p>{item.height}</p>
            <p>{item.mass}</p>
            <p>{item.hair_color}</p>
            <button onClick={() => btnFovorite(item.url)} className={style.btn}>
              Добавить в избранное
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
