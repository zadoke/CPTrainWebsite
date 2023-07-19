import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className='bottom-2 inset-x-0 pb-1 '>
            <div className='flex justify-between items-center p-2'>
                <div className='font-inter text-center w-full text-sm md:text-base'>
                    Poderão existir falhas entre os horários apresentados e a
                    realidade.
                    <br />© Infraestruturas de Portugal, S.A.
                </div>
                <a
                    href='https://github.com/zadoke/CPTrainWebsite'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-4x1 md:text-4xl mr-2'
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
