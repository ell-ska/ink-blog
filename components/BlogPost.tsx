import { Post } from '@/lib/type-collection'
import Image from 'next/image'

const BlogPost = ({ title, cover_image, body } : Post) => {
    return (
        <article className='prose prose-lg mb-20'>
            <h1 className='leading-tight'>{title}</h1>
            {cover_image && <Image
                className='border-1 border-dark-900 mb-12' // min-h-[calc(100vh-4rem)]
                src={cover_image}
                alt=''
                width={600}
                height={600}
            ></Image>}
            <div dangerouslySetInnerHTML={{ __html: body || '' }}></div>
        </article>
    )
}

export default BlogPost