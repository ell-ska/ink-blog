'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import NavLink from './NavLink'
import SearchBar from '../SearchBar'
import { Menu, X } from 'lucide-react'
import placeholder from '@/public/profile-placeholder.svg'
import type { Session } from '@supabase/supabase-js'
import type { User } from '@/lib/type-collection'

const menuItems = [
    {
        path: '/',
        name: 'home'
    },
    {
        path: '/read',
        name: 'read'
    },
    {
        path: '/write',
        name: 'write'
    }
]

const Nav = ({ session, user } : { session: Session | null, user: User | null | undefined }) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const path = usePathname()

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    }, [menuOpen])

    useEffect(() => {
        setMenuOpen(false)
    }, [path])
    
    return (
        <>
            <button className='md:hidden' onClick={() => setMenuOpen(prev => !prev)}>
                {menuOpen ? <X /> : <Menu />}
            </button>
            <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex md:static absolute h-[calc(100vh-3rem)] md:h-min z-40 top-12 left-0 flex flex-col md:flex-row gap-8 md:gap-6 justify-center md:justify-normal items-center w-full bg-light`}>
                {menuItems.map(item => <NavLink key={item.name} {...item}/>)}
                <SearchBar />
                {session ? (
                    <NavLink path='/profile' image={user?.profile_picture || placeholder}></NavLink>
                ) : (
                    <NavLink path='/login' name='login' styles='button-small md:ml-auto'/>
                )}
            </nav>
        </>
    )
}

export default Nav