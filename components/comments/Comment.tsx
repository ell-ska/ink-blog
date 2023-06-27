import Image from 'next/image'
import { getUser } from '@/api-routes/user'
import { getReplies } from '@/api-routes/comments'
import { createTimestamp } from '@/utils/create-timestamp'
import { DeleteButton } from './Buttons'
import Reply from './Reply'
import NewReply from './NewReply'
import image from 'public/profile-placeholder.svg'
import type { Session } from '@supabase/supabase-js'
import type { Comment as CommentType } from '@/lib/type-collection'

interface CommentProps extends CommentType { session: Session | null, post_author_id: string }

const Comment = async ({ author_id: comment_author, comment, created_at, id: comment_id, session, post_author_id } : CommentProps) => {

    const user = await getUser(comment_author)
    const timestamp = createTimestamp(created_at)
    const { data: replies } = await getReplies(comment_id)

    return (
        <div className='flex flex-col border-1 border-dark-900 p-8'>
            <div className='flex flex-wrap gap-2 items-center mb-4'>
                <Image src={image} alt='profile picture' height={32}></Image>
                <span>{user?.email}</span>
                {post_author_id === comment_author && <span className='button-small text-xs leading-none py-1 px-2'>author</span>}
                <span className='text-xs leading-none text-dark-500'>{timestamp}</span>
            </div>
            <div className='flex justify-between'>
                <p className='leading-normal'>{comment}</p>
                {(comment_author === session?.user.id || post_author_id === session?.user.id) && <DeleteButton id={comment_id} type={'comments'} />}
            </div>
            {replies && replies?.length > 0 && (
                <div className='flex flex-col gap-8 mt-8'>
                    {replies?.map(reply => (
                        <Reply
                            key={reply.id}
                            {...reply}
                            post_author_id={post_author_id}
                            current_user_id={session?.user.id}
                        />
                    ))}
                </div>
            )}
            <NewReply
                session={session}
                comment_id={comment_id}
                authorEmail={user?.email}
            />
        </div>
    )
}

export default Comment