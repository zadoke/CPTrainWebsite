import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatelliteDish, faTrain } from '@fortawesome/free-solid-svg-icons';

import Header from './header';
import Footer from './footer';
import { scheduleSearch } from '../api/scheduleSearch';

interface Train {
    carriages: number;
    date: string;
    destinationStationId: number;
    destinationStationName: string;
    info: string;
    operator: string;
    originStationId: number;
    originStationName: string;
    serviceType: string;
    time: string;
    trainNumber: number;
    trainPassed: boolean;
}

interface ScheduleData {
    stationId: number;
    stationName: string;
    trains: Train[];
}

const colorClassNames = {
    red: {
        text: 'text-red-500',
        ping: 'bg-red-400',
        dot: 'bg-red-500',
    },
    yellow: {
        text: 'text-yellow-500',
        ping: 'bg-yellow-400',
        dot: 'bg-yellow-500',
    },
    green: {
        text: 'text-green-500',
        ping: 'bg-green-400',
        dot: 'bg-green-500',
    },
};

const Schedule = () => {
    const { stationId } = useParams();
    const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);

    useEffect(() => {
        async function fetchStationData() {
            if (stationId) {
                const result = await scheduleSearch(parseInt(stationId));
                setScheduleData(result);
            }
        }
        fetchStationData();
    }, [stationId]);

    const getStatusColor = (info: string) => {
        switch (true) {
            case info.includes('Atraso previsto de'):
                return 'yellow';
            case info === 'SUPRIMIDO':
                return 'red';
            default:
                return 'green';
        }
    };
    const getSuppressedTrainCountText = (data: ScheduleData) => {
        const count = data.trains.filter(
            (train) => train.info === 'SUPRIMIDO'
        ).length;
        const suppressedText =
            count > 0
                ? `Estão ${count} comboios suprimidos :(`
                : 'Não há comboios suprimidos :)';
        return suppressedText;
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-grow relative'>
                {scheduleData ? (
                    <>
                        <Header
                            type='station'
                            stationName={scheduleData.stationName}
                        />
                        <div className='mt-16 ml-5 mr-5'>
                            <div className='font-inter font-bold text-center md:text-lg text-md py-6'>
                                {getSuppressedTrainCountText(scheduleData)}
                            </div>
                            <div className='flex flex-col space-y-5 md:py-5 md:px-20 md:max-w-screen-xl md:mx-auto mx-0'>
                                {scheduleData.trains.map((train) => {
                                    const color = getStatusColor(train.info);
                                    const {
                                        text: textClassName,
                                        ping: pingClassName,
                                        dot: dotClassName,
                                    } = colorClassNames[color];
                                    return (
                                        <div
                                            key={train.trainNumber}
                                            className='bg-gray-100 backdrop-blur-xl rounded-full shadow-md md:px-10 px-8 md:py-4 py-3 transition-all duration-500 hover:opacity-70'
                                        >
                                            <div className='flex flex-row items-center'>
                                                <img
                                                    src={
                                                        train.operator.includes(
                                                            'CP'
                                                        )
                                                            ? '/cp-logo.png'
                                                            : '/fertagus-logo.png'
                                                    }
                                                    className='w-7 h-7 md:w-10 md:h-10 rounded-lg shadow-xl border-xl border-green-400 bg-opacity-30  dark:shadow-gray-400 md:mr-4 mr-3 '
                                                    alt='logo'
                                                />
                                                <div className='grid grid-cols-2 flex-1 md:mr-8'>
                                                    <section>
                                                        <div className='flex items-center'>
                                                            <span className='relative flex h-3 w-3 md:mr-3 mr-2'>
                                                                <span
                                                                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingClassName} opacity-75`}
                                                                ></span>
                                                                <span
                                                                    className={`relative inline-flex rounded-full h-3 w-3 ${dotClassName}`}
                                                                ></span>
                                                            </span>
                                                            <div
                                                                className={`font-inter md:text-lg text-md font-medium -ml-1 ${textClassName}`}
                                                            >
                                                                {train.time}{' '}
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={`font-inter md:text-lg whitespace-nowrap text-sm  ${textClassName}`}
                                                        >
                                                            {train.info}
                                                        </div>

                                                        <div className='flex whitespace-nowrap justify-start items-center w-full'>
                                                            <div className='font-inter text-gray-800 md:block hidden'>
                                                                {
                                                                    train.originStationName
                                                                }
                                                            </div>
                                                            <div className='font-inter text-gray-800 md:mx-2 hidden md:block'>
                                                                &rarr;
                                                            </div>
                                                            <div className='font-inter text-sm sm:text-base font-extrabold text-gray-800'>
                                                                {
                                                                    train.destinationStationName
                                                                }
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <section className='md:pt-1.5 md:text-sm text-xs'>
                                                        <div className='font-inter  text-gray-600 text-right inline-block align-middle float-right'>
                                                            <div>
                                                                {
                                                                    train.serviceType
                                                                }
                                                            </div>

                                                            <div className='font-inter text-gray-600 pt-1.5 text-right'>
                                                                <div className=''>
                                                                    <FontAwesomeIcon
                                                                        className='px-1'
                                                                        icon={
                                                                            faSatelliteDish
                                                                        }
                                                                    ></FontAwesomeIcon>
                                                                    {
                                                                        train.trainNumber
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className='font-inter text-gray-600 text-right pt-1'>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrain
                                                                    }
                                                                ></FontAwesomeIcon>{' '}
                                                                {
                                                                    train.carriages
                                                                }
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Placeholder for station name */}
                        <div
                            role='status'
                            className='max-w-sm animate-pulse my-8 ml-4'
                        >
                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4'></div>
                            <span className='sr-only'>A carregar...</span>
                        </div>

                        {/* Placeholder for cards */}
                        {[...Array(10)].map((_, index) => (
                            <div
                                key={index}
                                role='status'
                                className='flex flex-col space-y-4  border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'
                            >
                                <div className='flex items-center justify-between px-8 py-2 h-3'>
                                    <div>
                                        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                                        <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                                    </div>
                                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Schedule;
