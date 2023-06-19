import { getPost } from '@/api-routes/posts'
import BlogEditor from '@/components/editor/BlogEditor'
import type { Post } from '@/lib/type-collection'
export const revalidate = 0

const Edit = async ({ params } : { params: { slug: string } }) => {

    const { slug } = params
    let post: Post | null = null

    try {
        post = await getPost(slug)
    } catch (error) {
        console.log(error)
    }

    if (!post) return (
        <div>no post found</div>
    )

    // const { data, error } = useSWR(slug ? `${postCacheKey}/${slug}` : null, () => getPost(slug))
    // : { data: post = {} }
    // get image File

    return (
        <BlogEditor
            postId={post.id}
            defaultTitle={post.title}
            defaultImage={post.cover_image || undefined}
            defaultBody={post.body}
            buttons={['update']}
        />
    )
}

export default Edit