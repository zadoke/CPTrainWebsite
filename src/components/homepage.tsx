import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/homepage.css';

import { stationSearch } from '../api/stationSearch';
import Header from './header';
import Footer from './footer';

interface Suggestion {
    name: string;
    id: string;
}

const Homepage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedStationId, setSelectedStationId] = useState<number | null>(
        null
    );
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
        setFormSubmitted(true);
        if (selectedStationId !== null) {
            navigate(`/schedule/${selectedStationId}`);
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-grow'>
                <Header />
                <div className='flex items-center justify-center bg-white min-h-screen'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-4xl font-semibold mb-4 transition-all duration-500 ease-in-out transform'>
                            CPTrainWebsite
                        </h1>
                        {formSubmitted && selectedStationId === null && (
                            <div
                                className='font-inter justify-center w-80 bg-gray-100 rounded-full backdrop-blur-sm shadow-xl transition-all duration-700 ease-in-out transform  my-4 py-4 px-8 text-center '
                                role='alert'
                            >
                                <span className='block sm:inline text-center'>
                                    Seleciona uma estação da lista.
                                </span>
                            </div>
                        )}
                        <form
                            onSubmit={handleSearchSubmit}
                            className='relative'
                        >
                            <div className='w-80 bg-gray-400 overflow-hidden border border-gray-600 rounded-full backdrop-blur hover:shadow-xl transition-all duration-700 ease-in-out transform'>
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className='input font-inter'
                                    placeholder='Procura uma estação...'
                                />
                            </div>
                            <div className='w-80 mt-2 overflow-hidden transition-all duration-700'>
                                <ul
                                    className={`bg-grey-800 transform origin-top transition-all duration-500 ${
                                        suggestions.length > 0
                                            ? 'scale-y-100'
                                            : 'scale-y-0'
                                    }`}
                                >
                                    {suggestions
                                        .slice(0, 7)
                                        .map((suggestion, index) => (
                                            <li
                                                key={index}
                                                className='font-inter h-12 pl-10 pr-5 text-lg flex items-center transition-all duration-400 hover:shadow-md hover:translate-y-1 rounded-full'
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        suggestion.name,
                                                        Number(suggestion.id)
                                                    )
                                                }
                                            >
                                                {suggestion.name}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <button
                                type='submit'
                                className='transition ease-in-out delay-150 hover:translate-x-1 hover:scale-120 absolute top-0 right-0 mt-3 mr-4'
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Homepage;
