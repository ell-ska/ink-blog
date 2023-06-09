import { Post } from '@/lib/type-collection'
import Image from 'next/image'
import Link from 'next/link'

const GalleryItem = ({ title, cover_image, slug } : Post) => {
    return (
        <Link href={`/read/${slug}`}>
            {cover_image && <Image
                className='aspect-square object-cover border-1 border-dark-900'
                src={cover_image}
                alt=''
                width={664}
                height={664}
            ></Image>}
            <h3 className='text-xs font-bold mt-5'>ellska</h3>
            <h2 className='text-xl mt-1'>{title}</h2>
        </Link>
    )
}

const GallerySection = ({ posts } : { posts: Post[] | null }) => {
    return (
        <section className='grid grid-cols-4 gap-x-4 gap-y-16 px-8 py-20'>
            {posts?.map(post => <GalleryItem key={post.id} {...post} />)}
        </section>
    )
}

export default GallerySection