import React, { useState, ChangeEvent } from 'react';
import '../App.css';

interface Props {
  onSearch: (query: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');


  const handleSearch = () => {
    onSearch(query);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h2>Pesquisar Música ou Artista</h2>
      <div>
        <input
          type="text"
          placeholder="Ex: Kill Bill"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
    </div>
  );
};

export default Search;
