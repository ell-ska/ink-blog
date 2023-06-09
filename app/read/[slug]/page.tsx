import Image from 'next/image'
import { getPost } from '@/api-routes/posts'
import BlogPost from '@/components/BlogPost'
import profilePic from '@/public/profile-placeholder.svg'
import type { Post } from '@/lib/type-collection'

const ReadPost = async ({ params } : { params: { slug: string } }) => {

    const { slug } = params
    let post: Post | null = null

    try {
      post = await getPost(slug)
    } catch (error) {
      console.log(error)
    }

    return (
        <>
            <div className='flex justify-between items-center max-w-xl w-3/4 mb-8 mt-20'>
                <div className='flex items-center gap-6'>
                    <Image src={profilePic} alt=''></Image>
                    <span>ellska</span>
                </div>
                <div>June 5, 2023</div>
            </div>
            {post && <BlogPost {...post}/>}
        </>
    )
}

export default ReadPost