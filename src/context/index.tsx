'use client';
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type DataType = {
  item: Object;
};

interface ContextProps {
  favorite: DataType[];
  setFavorite: Dispatch<SetStateAction<DataType[]>>;
}

const FavoriteContext = createContext<ContextProps>({
  favorite: [],
  setFavorite: (): DataType[] => [],
});

export const FavoriteContextProvider = ({ children }) => {
  const [favorite, setFavorite] = useState<[] | DataType[]>([]);
  return (
    <FavoriteContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);
