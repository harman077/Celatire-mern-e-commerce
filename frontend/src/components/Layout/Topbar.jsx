import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Topbar = () => {
    return (
        <div className='bg-danger text-white '>

            <div className='d-flex flex-row justify-content-around'>

            <div className=' p-1 h-75 d-none d-sm-block'>
                {/* insta icon  */}
                <a href="#" className='mx-2 text-white hover'><FaInstagram /></a>

                {/* twitter icon  */}
                <a href="#" className='mx-2 text-white hover'><FaTwitter /></a>

                {/* facebook icon  */}

                <a href="#" className='mx-2 text-white hover'><FaFacebook /></a>
            </div>

            {/* text  */}
            <div className='text-center p-1 h-75'>
                <span>We ship worldwide - Fast and reliable shipping !</span>
            </div>

            {/* ph no  */}

            <div>
                <a href="#" className='hover pt-1 text-white h-75 d-none d-sm-block'>+1234567890</a>
            </div>

            </div>

            
        </div>
    )
}

export default Topbar