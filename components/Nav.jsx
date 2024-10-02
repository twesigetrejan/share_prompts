"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    const [providers, SetProviders] = useState(null);
    const [toggleDropdown, ssetToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            SetProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className='black_btn'>Create Post</Link>
                        <button onClick={signOut} type='button' className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src="/images/logo.svg" alt='profile image' width={30} height={30} className='rounded-full' />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn">
                                    Sign In
                                </button>
                            ))

                        }
                    </>)}
            </div>
            {/* mobile navigation */}
            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className="flex">
                            <Image src="/images/logo.svg" alt='profile image'
                                width={37} height={37} className='rounded-full' onClick={() => ssetToggleDropdown((prev) => !prev)} />
                            {toggleDropdown && (
                                <div className="dropdown">
                                    <Link href="/profile" className='dropdown_link' onClick={() => ssetToggleDropdown(false)}>
                                        My Profile
                                    </Link>
                                    <Link href="/create-prompt" className='dropdown_link' onClick={() => ssetToggleDropdown(false)}>
                                        Create Prompt
                                    </Link>
                                    <button type='button' onClick={() => {
                                        ssetToggleDropdown(false);
                                        signOut();

                                    }} className='mt-5 w-full black_btn'>
                                        SignOut
                                    </button>

                                </div>
                            )

                            }

                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn">
                                        Sign In
                                    </button>
                                ))

                            }</>

                    )
                }

            </div>
        </nav>


    )
}

export default Navbar