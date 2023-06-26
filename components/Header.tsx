import { cookies } from 'next/headers'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUser } from '@/api-routes/user'
import type { Database } from '@/lib/database.types'
import Nav from './navigation/Nav'

const Header = async () => {

    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    const user = await getUser(session?.user.id)

    return (
        <header className='absolute z-50 w-full bg-light flex justify-between md:justify-normal items-center gap-12 px-8 h-12 border-b-1'>
            <Link href='/' className='font-marker text-3xl'>ink</Link>
            <Nav session={session} user={user} />
        </header>
    )
}

export default Header