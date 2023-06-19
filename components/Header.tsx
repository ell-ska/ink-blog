import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import NavLink from './NavLink'
import placeholder from '@/public/profile-placeholder.svg'
import type { Database } from '@/lib/database.types'
import SearchBar from './SearchBar'

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

const Header = async () => {

    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    return (
        <header className='flex items-center gap-12 px-8 py-2 border-b-1'>
            <span className={`font-marker text-3xl`}>ink</span>
            <nav className='flex gap-6 items-center w-full'>
                {menuItems.map(item => <NavLink key={item.name} {...item}/>)}
                <SearchBar />
            </nav>
            {session ? (
                <NavLink path='/profile' image={placeholder}></NavLink>
            ) : (
                <NavLink path='/login' name='login' styles='button-small'/>
            )}
        </header>
    )
}

export default Header