import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Character() {
  interface ICharacter {
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    url: string;
  }
  const router = useRouter();
  const [character, setCharacter] = useState<ICharacter>({
    name: '',
    height: 0,
    mass: 0,
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    url: '',
  });
  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/${router.query.id}`)
      .then(({ data }) => {
        console.log(data);
        setCharacter(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Данные персонажа</h1>
      <h3>Name: {character.name}</h3>
      <h3>Height: {character.height}</h3>
      <h3>Mass: {character.mass}</h3>
      <h3>Skin color: {character.skin_color}</h3>
      <h3>Hair color: {character.hair_color}</h3>
      <h3>Eye color: {character.eye_color}</h3>
      <h3>Birth: {character.birth_year}</h3>
      <h3>Gender: {character.gender}</h3>
    </div>
  );
}
