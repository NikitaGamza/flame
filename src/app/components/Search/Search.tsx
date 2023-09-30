import axios from 'axios';
import { useState, useEffect } from 'react';
import style from './Search.module.scss';
import Link from 'next/link';

export default function Search() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people?search=${search}`)
      .then(({ data }) => {
        console.log(data);
        setSearchResult(data.results);
      })
      .catch((err) => console.log(err));
  }, [search]);
  return (
    <div className={style.wrap}>
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={style.modal}>
        {search !== '' &&
          searchResult.map((item: any, index) => (
            <div key={index}>
              <Link
                href={`/people/${item.url.split('/')[5]}`}
                className={style.found}
              >
                {/* как извлечь id */}
                {item.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
