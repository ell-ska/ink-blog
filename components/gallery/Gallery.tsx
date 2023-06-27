import GalleryItem from './GalleryItem'
import type { Post } from '@/lib/type-collection'

const Gallery = ({ posts, isProfile } : { posts: Post[], isProfile?: boolean }) => {
    return (
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(17rem,_1fr))] gap-x-4 gap-y-8 md:gap-y-16'>
            {posts.map(post => <GalleryItem key={post.id} {...post} isProfile={isProfile} />)}
        </div>
    )
}

export default Gallery