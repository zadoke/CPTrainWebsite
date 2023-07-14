import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/homepage.css';

import { stationSearch } from '../api/stationSearch';

interface Suggestion {
  name: string;
  id: string;
}

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  
    // update suggestions based on search query
    if (event.target.value.length > 0) {
        const data = await stationSearch(event.target.value);
        setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string, id: number) => {
    setSearchQuery(name);
    setSelectedStationId(id);
    setSuggestions([]);
  };
  

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/schedule/${selectedStationId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
            <div className="font-inter fixed top-6 right-0 mr-4  ">
                <a href="#" className="mx-2 p-1 hover:underline transition-all duration-500 ease-in-out">Horarios</a>
                <a href="#" className="mx-2 p-1 hover:underline">Comboio</a>
                <a href="#" className="mx-2 p-1 hover:underline">Alerta</a>
            </div>
            <div className="flex items-center justify-center bg-white min-h-screen">
            <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-semibold mb-4 transition-all duration-500 ease-in-out transform">CPTrainWebsite</h1>
                    <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="w-80 bg-gray-400 overflow-hidden border border-gray-600 rounded-full backdrop-blur hover:shadow-xl transition-all duration-700 ease-in-out transform">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="input font-inter"
                            placeholder="Procura uma estação..."
                        />
                    </div>
                    <div className="w-80 mt-2 overflow-hidden transition-all duration-700">
                        <ul className={`bg-grey-800 transform origin-top transition-all duration-500 ${suggestions.length > 0 ? 'scale-y-100' : 'scale-y-0'}`}>
                            { suggestions.slice(0, 7).map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="font-inter h-12 pl-10 pr-5 text-lg flex items-center transition-all duration-400 hover:shadow-md hover:translate-y-1"
                                    onClick={() => handleSuggestionClick(suggestion.name, Number(suggestion.id))}
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="transition ease-in-out delay-150 hover:translate-x-1 hover:scale-120 absolute top-0 right-0 mt-3 mr-4">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    </form>
                </div>
            </div>
            <footer className="font-inter flex inset-x-0 bottom-0 justify-center mt-4 mb-4 footer">
            Poderão existir falhas entre os horários apresentados e a realidade.
            <br />
            © Infraestruturas de Portugal, S.A.
            </footer>

        </div>
        <a
      href="https://github.com/zadoke"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 text-4xl"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
    </div>
  );
};


export default Homepage;
