import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './homepage.css';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    // update suggestions based on search query
    if (event.target.value.length > 0) {
      setSuggestions([
        'Lisbon Oriente',
        'Porto Campanhã',
        'Coimbra-B',
        'Braga',
        'Faro',
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting search query: ${searchQuery}`);
    // handle search submission here
  };

  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
            <div className="flex items-center justify-center bg-white min-h-screen">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-semibold mb-4">CPTrainWebsite</h1>
                    <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="w-80 bg-gray-100 overflow-hidden border border-gray-600 rounded-full backdrop-blur">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="input font-inter"
                        placeholder="Search..."
                    />
                    </div>
                    <div className="w-80 mt-2 overflow-hidden transition-all duration-700">
                        <ul className={`bg-grey-100 bg-opacity-70 backdrop-blur-md rounded-lg transform origin-top transition-all duration-700 ${suggestions.length > 0 ? 'scale-y-100' : 'scale-y-0'}`}>
                        {suggestions.map((suggestion) => (
                            <li
                            key={suggestion}
                            className="h-12 pl-10 pr-5 text-lg focus:outline-none flex items-center"
                            style={{ fontFamily: 'Inter' }}
                            >
                            {suggestion}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <button type="submit" className="absolute top-0 right-0 mt-3 mr-4">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    </form>
                </div>
            </div>
            <footer className="font-inter flex justify-center mt-4 mb-4 footer">
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
