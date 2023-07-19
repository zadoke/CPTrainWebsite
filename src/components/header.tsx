import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrain } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    type: 'station' | 'train' | 'none';
    stationName?: string;
    trainNumber?: number;
}

function Header({type, stationName, trainNumber}: HeaderProps) {
    return (
        <nav className='backdrop-blur-sm bg-white/70 rounded font-inter pt-3 pb-3 fixed right-0 left-0 mr-4 z-50'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <div></div>
                {type === 'station' && stationName && (
                    <div className='font-inter fixed ml-5 my-5 flex items-center z-50'>
                        <Link to='/'>
                            <button className='transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-120 '>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </Link>
                        <h3 className='text-2xl font-bold ml-4'>
                            {stationName}
                            <sub className='px-0.5'>horários</sub>
                        </h3>
                    </div>
                )}
                {type === 'train' && trainNumber && (
                    <div className='font-inter fixed ml-5 my-5 flex items-center z-50'>
                        <Link to='/'>
                            <button className='transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-120 '>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </Link>
                        <h3 className='text-2xl font-bold ml-4'>
                            {trainNumber}
                            <sup>comboio</sup>
                        </h3>
                    </div>
                )}
                <button
                    data-collapse-toggle='navbar-default'
                    type='button'
                    className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
                    aria-controls='navbar-default'
                    aria-expanded='false'
                >
                    <svg
                        className='w-5 h-5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 17 14'
                    >
                        <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M1 1h15M1 7h15M1 13h15'
                        />
                    </svg>
                </button>
                <div
                    className='hidden w-full md:block md:w-auto'
                    id='navbar-default'
                >
                    <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white'>
                        <li>
                            <a
                                href='#'
                                className='block py-2 pl-3 pr-4 text-white rounded md:bg-white md:text-black md:p-0 dark:text-white text-black hover:text-gray-700'
                                aria-current='page'
                            >
                                Horários
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='block py-2 pl-3 pr-4 text-white rounded md:bg-white md:text-black md:p-0 dark:text-white text-black hover:text-gray-700'
                            >
                                Comboio
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='block py-2 pl-3 pr-4 text-white rounded md:bg-white md:text-black md:p-0 dark:text-white text-black hover:text-gray-700'
                            >
                                Alerta
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
