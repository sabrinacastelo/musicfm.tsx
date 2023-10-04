import React, { useState } from 'react';
import axios from 'axios';
import TopTracks from './components/TopTracks'
import Search from './components/Search'
import './App.css';

interface Track {
  name: string;
  artist: string;
  // Adicione outras propriedades do objeto de faixa, se necessário
}

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Track[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=361c60dc193ce85ba3f6f42211af6434&format=json`
      );

      if (response.data.results.trackmatches.track) {
        setSearchResults(response.data.results.trackmatches.track);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for tracks:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Music FM</h1>
      <div className="row">
        <div className="col-md-6">
          <TopTracks />
        </div>
        <div className="col-md-6">
          <Search onSearch={handleSearch} />
          <div>
            <ul className="list-group">
              {searchResults.map((result, index) => (
                <li key={index} className="list-group-item">
                  {result.name} by {result.artist}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
