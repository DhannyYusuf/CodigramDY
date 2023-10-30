import {BsGithub, BsInstagram} from "react-icons/bs";
import {AiOutlineLinkedin} from "react-icons/ai";
import {IoNavigate} from "react-icons/io5";

export const ContactUs = () => {
    return (
        <div className='container pt-5'>
            <div className='card w-50'>
                <div className='card-header'>
                    <h3>Contact Us</h3>
                </div>
                <div className='card-body'>
                    <a href='https://www.instagram.com/dhanny_yusuf21/' target='_blank'>
                        <div className='mb-2 d-flex'>
                            <div>
                                <BsInstagram size={50}/>
                            </div>
                            <div className='d-flex ps-2 align-items-center'>
                                <h3>Dhany Y</h3>
                            </div>
                            <div className='d-flex ps-2 '>
                                <IoNavigate size={25}/>
                            </div>
                        </div>
                    </a>
                    <a href='https://www.linkedin.com/in/dhanny-yusuf-80b29b227/' target='_blank'>
                        <div className='mb-2 d-flex'>
                            <div>
                                <AiOutlineLinkedin size={50}/>
                            </div>
                            <div className='d-flex ps-2 align-items-center'>
                                <h3>Dhanny Yusuf</h3>
                            </div>
                            <div className='d-flex ps-2 '>
                                <IoNavigate size={25}/>
                            </div>
                        </div>
                    </a>
                    <a href='https://github.com/DhannyYusuf/' target='_blank'>
                        <div className='mb-2 d-flex'>
                            <div>
                                <BsGithub size={50}/>
                            </div>
                            <div className='d-flex ps-2 align-items-center'>
                                <h3>Dhanny Yusuf</h3>
                            </div>
                            <div className='d-flex ps-2 '>
                                <IoNavigate size={25}/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
