import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/type-collection'

const FeaturedGallery = ({ posts, styles } : { posts: Post[] | undefined, styles?: string}) => {
    return (
        <section className={`grid md:grid-cols-2 gap-px bg-dark-900 border-y-1 border-dark-900 ${styles}`}>
            {posts?.map(({ slug, cover_image, title, id } : Post) => (
                <Link key={id} href={`/read/${slug}`} className='relative'>
                    {cover_image && <Image
                        src={cover_image} alt=''
                        height={800}
                        width={800}
                        className='h-[60svh] md:h-[80svh] object-cover'
                    />}
                    <h3 className='font-marker text-light drop-shadow-lg text-xl absolute inset-x-8 bottom-8 md:inset-20'>{title}</h3>
                </Link>
            ))}
        </section>
    )
}

export default FeaturedGallery