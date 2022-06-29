import React from 'react'
import Link from 'next/link';

import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='footer-container'>
            <h5>@2022, All rights resereved</h5>

            <div className="icons">
                <Link href="http://facebook.com">
                    <AiFillFacebook />
                </Link>
                <Link href="http://instagram.com">
                    <AiFillInstagram />
                </Link>
                <Link href="http://twitter.com">
                    <AiOutlineTwitter />
                </Link>
                <Link href="http://github.com">
                    <AiFillGithub />
                </Link>
            </div>
        </div>
    )
}

export default Footer