import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

interface SocialProps {
    linkedin: string;
    github: string;
    twitter: string;
}

interface FooterProps {
    className: string;
    owner: string;
    socials: SocialProps;
}

const Footer = ({ className, owner, socials }: FooterProps) => {
    return (
        <footer className={`${className} w-full`}>
            <div className='grid grid-cols-1 md:grid-cols-2 pb-10'>
                <div className='px-3 py-10 text-center md:text-left'>{owner}</div>
                <div>
                    <ul className='flex justify-center md:justify-end space-x-4 py-10 pr-4'>
                        <li>
                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-white cursor-pointer hover:text-blue-400" size={24} />
                            </a>
                        </li>
                        <li>
                            <a href={socials.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-white hover:text-gray-800 cursor-pointer" size={24} />
                            </a>
                        </li>
                        <li>
                            <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-white hover:text-blue-400 cursor-pointer" size={24} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
