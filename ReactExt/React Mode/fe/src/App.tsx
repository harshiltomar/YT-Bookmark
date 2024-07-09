import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Define the interface for the match object
interface Team {
  teamId: string;
  name: string;
  logo: string;
  abbr: string;
  teamKey: string;
}

interface Venue {
  venueId: string;
  name: string;
  location: string;
}

interface Match {
  _id: string;
  matchKey: string;
  endDate: string;
  startDate: string;
  gameStateStatus: string;
  statusStr: string;
  teams: {
    home: Team;
    away: Team;
  };
  venue: Venue;
}

function App() {
  const [match, setMatch] = useState<Match | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<{ status: number, result: { live: Match[] } }>('https://football-manager.api.dev.oneturf.news/api/matches/scorecards?timezone=America/Los_Angeles')
      .then(response => {
        if (response.data.result.live.length > 0) {
          setMatch(response.data.result.live[0]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setError(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 w-[300px]">
      <div className='text-blue-500 text-center text-2xl mb-4'>One Turf Cricket</div>
      {error && <p className="text-center text-red-500">There was an error loading the match.</p>}
      {match && (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className='text-xl font-bold text-gray-800'>{match.teams.home.name} vs {match.teams.away.name}</h2>
            <p className='text-gray-600'><strong>Status:</strong> {match.gameStateStatus}</p>
            <p className='text-gray-600'><strong>Start:</strong> {new Date(match.startDate).toLocaleString()}</p>
            <p className='text-gray-600'><strong>End:</strong> {new Date(match.endDate).toLocaleString()}</p>
            <p className='text-gray-600'><strong>Venue:</strong> {match.venue.name}, {match.venue.location}</p>
            <div className='flex justify-between mt-4'>
              <div className='flex items-center'>
                <img src={match.teams.home.logo} alt={match.teams.home.name} className='w-8 h-8 mr-2' />
                <span>{match.teams.home.name}</span>
              </div>
              <div className='flex items-center'>
                <img src={match.teams.away.logo} alt={match.teams.away.name} className='w-8 h-8 mr-2' />
                <span>{match.teams.away.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
