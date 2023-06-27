import { getPublishedPosts } from '@/api-routes/posts'
import Gallery from '@/components/gallery/Gallery'
import type { Post } from '@/lib/type-collection'

export const revalidate = 0

const Read = async () => {

	let posts: Post[] | null = []

	try {
		posts = await getPublishedPosts()
	} catch (error) {
		console.log(error)
	}

	return (
		<section className='px-8 py-12 md:py-20 w-full'>
			{posts && <Gallery posts={posts}/>}
		</section>
	)
}

export default Read