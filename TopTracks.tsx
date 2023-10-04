import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Track {
  name: string;
  artist: {
    name: string;
  };
}

const TopTracks: React.FC = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=361c60dc193ce85ba3f6f42211af6434&format=json'
        );

        // Verifique se a resposta possui a estrutura correta
        if (response.data?.tracks?.track) {
          setTopTracks(response.data.tracks.track.slice(0, 10));
        } else {
          console.error('Error fetching top tracks: Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchData();
  }, []);

    return (
    <div>
      <h2>Top 10 Músicas Mais Ouvidas</h2>
      <ul>
        {topTracks.map((track, index) => (
          <li key={index}>
            {track.name} by {track.artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default TopTracks;
