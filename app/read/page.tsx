import { getPosts } from '@/api-routes/posts'
import GallerySection from '@/components/GallerySection'
import type { Post } from '@/lib/type-collection'

const Read = async () => {

  let posts: Post[] | null = []

  try {
    posts = await getPosts()
  } catch (error) {
    console.log(error)
  }

  return (
      <GallerySection posts={posts}/>
  )
}

export default Read