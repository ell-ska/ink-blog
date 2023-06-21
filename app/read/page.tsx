import { getPosts } from '@/api-routes/posts'
import Gallery from '@/components/gallery/Gallery'
import type { Post } from '@/lib/type-collection'

export const revalidate = 0

const Read = async () => {

	let posts: Post[] | null = []

	try {
		posts = await getPosts()
	} catch (error) {
		console.log(error)
	}

	return (
		<section className='px-8 py-20'>
			{posts && <Gallery posts={posts} isProfile={false}/>}
		</section>
	)
}

export default Read