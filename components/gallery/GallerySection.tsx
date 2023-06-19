import GalleryItem from './GalleryItem'
import type { Post } from '@/lib/type-collection'

const GallerySection = ({ posts } : { posts: Post[] | null }) => {
    return (
        <section className='grid grid-cols-4 gap-x-4 gap-y-16 px-8 py-20'>
            {posts?.map(post => <GalleryItem key={post.id} {...post} />)}
        </section>
    )
}

export default GallerySection