import Image from 'next/image'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import format from 'date-fns/format'
import { getPost } from '@/api-routes/posts'
import { getUser } from '@/api-routes/user'
import BlogPost from '@/components/BlogPost'
import CommentSection from '@/components/comments/CommentSection'
import { DeleteButton, EditButton } from './Buttons'
import profilePic from '@/public/profile-placeholder.svg'
import type { Database } from '@/lib/database.types'
import type { Post, User } from '@/lib/type-collection'

const ReadPost = async ({ params } : { params: { slug: string } }) => {

    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    const { slug } = params
    let post: Post | null = null
    let author: User | null | undefined = null

    try {
        post = await getPost(slug)
        author = post && await getUser(post.user_id)
    } catch (error) {
        console.log(error)
    }

    const date = post && format(new Date(post.created_at), 'MMMM d, yyyy')

    if (!post) return <div>no post found</div>

    return (
        <div className='my-12 md:my-20 max-w-xl w-full px-8 md:w-3/4'>
            {post.user_id === session?.user.id && (
                <div className='flex gap-2 justify-end mb-4'>
                    <EditButton slug={slug}></EditButton>
                    <DeleteButton id={post.id}></DeleteButton>
                </div>
            )}
            <div className='flex flex-wrap gap-y-4 justify-between items-center mb-8'>
                <div className='flex items-center gap-6'>
                    <Image src={profilePic} alt=''></Image>
                    <span>{author?.email}</span>
                </div>
                <div>{date}</div>
            </div>
            <BlogPost {...post}/>
            <CommentSection post_id={post.id} post_author_id={post.user_id} session={session}/>
        </div>
    )
}

export default ReadPost