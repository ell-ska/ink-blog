import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUserPosts } from '@/api-routes/posts'
import { getUser } from '@/api-routes/user'
import Gallery from '@/components/gallery/Gallery'
import ProfileDetails from './ProfileDetails'
import type { Database } from '@/lib/database.types'

const Profile = async () => {

    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    const posts = await getUserPosts(session?.user.id)
    const user = await getUser(session?.user.id)

    return (
        <>
            {user && <ProfileDetails {...user}/>}
            <section className='flex flex-col gap-8 w-full px-8 py-12 md:py-20'>
                <h2 className='text-2xl font-bold leading-none'>my posts</h2>
                {posts && <Gallery posts={posts} isProfile={true} />}
            </section>
        </>
    )
}

export default Profile