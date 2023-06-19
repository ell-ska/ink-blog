import { Post } from '@/lib/type-collection'
import Image from 'next/image'

const BlogPost = ({ title, cover_image, body } : Post) => {
    return (
        <article className='mb-20 post'>
            <h1 className='text-7xl leading-tight mb-4'>{title}</h1>
            {cover_image && <Image
                className='border-1 border-dark-900 mb-12' // min-h-[calc(100vh-4rem)]
                src={cover_image}
                alt=''
                width={600}
                height={600}
            ></Image>}
            <div
                className='text-xl leading-8'
                dangerouslySetInnerHTML={{ __html: body || '' }}
            ></div>
        </article>
    )
}

export default BlogPost