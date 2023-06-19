import { getComments } from '@/api-routes/comments'
import Comment from './Comment'
import NewComment from './NewComment'
import type { Comment as CommentType } from '@/lib/type-collection'
import type { Session } from '@supabase/supabase-js'

type CommentSectionType = {
    post_id : string,
    post_author_id: string,
    session: Session | null
}

export const revalidate = 30

const CommentSection = async ({ post_id, post_author_id, session } : CommentSectionType) => {

    let comments: CommentType[] | null = null

    try {
        comments = await getComments(post_id)
    } catch (error) {
        console.log(error)
    }

    return (
        <section className='flex flex-col gap-12'>
            {session && <NewComment post_id={post_id} current_user_id={session.user.id} />}
            {comments && comments.length > 0 && (
                <div className='flex flex-col gap-8'>
                    {comments.map(comment => <Comment
                        key={comment.id}
                        {...comment}
                        session={session}
                        post_author_id={post_author_id}
                    />)}
                </div>
            )}
        </section>
    )
}

export default CommentSection