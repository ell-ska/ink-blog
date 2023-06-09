import { Post } from '@/lib/type-collection'
import Image from 'next/image'

const BlogPost = ({ title, cover_image, body } : Post) => {
    return (
        <article className='max-w-xl'>
            <h1 className='text-7xl leading-tight mb-4'>{title}</h1>
            {cover_image && <Image
                className='h-[calc(100vh-4rem)] border-1 border-dark-900 mb-12'
                src={cover_image}
                alt=''
                width={1200}
                height={1200}
            ></Image>}
            <p className='text-xl leading-8'>{body}</p>
        </article>
    )
}

export default BlogPost