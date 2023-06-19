import { getComments } from '@/api-routes/comments'
import Comment from './Comment'
import NewComment from './NewComment'
import type { Comment as CommentType } from '@/lib/type-collection'
import type { Session } from '@supabase/supabase-js'

export const revalidate = 30

const CommentSection = async ({ id: post_id, postAuthorId, session } : { id : string, postAuthorId: string , session: Session | null }) => {

    let comments: CommentType[] | null = null

    try {
        comments = await getComments(post_id)
    } catch (error) {
        console.log(error)
    }

    return (
        <section>
            {comments && comments.length > 0 && (
                <div className='flex flex-col gap-8 mb-20'>
                    {comments.map(comment => <Comment
                        key={comment.id}
                        {...comment}
                        session={session}
                        postAuthorId={postAuthorId}
                    />)}
                </div>
            )}
            {session && <NewComment post_id={post_id} author_id={session.user.id} />}
        </section>
    )
}

export default CommentSection