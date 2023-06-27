import Image from 'next/image'
import { getFeaturedPosts, getPublishedPosts } from '@/api-routes/posts'
import Gallery from '@/components/gallery/Gallery'
import FeaturedGallery from '@/components/gallery/FeaturedGallery'
import dot from '@/public/dot.svg'

export const revalidate = 0

const Home = async () => {

	const featured = await getFeaturedPosts()
	const latest = await getPublishedPosts()

	return (
		<>
			<FeaturedGallery posts={featured?.slice(0, 2)} styles='border-t-0' />
			<section className='w-full p-8 my-8 md:my-12'>
				<div className='flex gap-2 mb-8'>
					<Image src={dot} alt=''></Image>
					<h2 className='font-bold'>just in</h2>
				</div>
				{latest && <Gallery posts={latest.slice(0, 4)} />}
			</section>
			<FeaturedGallery posts={featured?.slice(2, 4)} styles='mb-8 md:mb-12' />
		</>
	)
}

export default Home