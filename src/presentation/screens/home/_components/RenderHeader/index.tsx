import { memo } from 'react';
import { HomeHeader } from '../header';
import { SearchInput } from '../search-input';

/**
  memo -> memoiza o componente para evitar re-renders.
  Neste caso ele armazena o valor digitado para evitar que a cada valor digitado, 
  o teclado feche.
  Só irá fazer a requisição HTTP após ficar meio segundo (500ms) sem digitar no input.
  */
export const RenderHeader = memo(
  ({
    searchInputText,
    setSearchInputText,
  }: {
    searchInputText: string;
    setSearchInputText: (text: string) => void;
  }) => {
    return (
      <>
        <HomeHeader />
        <SearchInput
          value={searchInputText}
          setSearchInputText={setSearchInputText}
        />
      </>
    );
  },
);
