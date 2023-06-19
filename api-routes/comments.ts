import supabase from '@/lib/supabase-client'

const getComments = async (post_id: string) => {
    const { data, error, status } = await supabase
        .from('comments')
        .select()
        .eq('post_id', post_id)

    return data
}

const getReplies = async (comment_id: string) => {
    const { data, error, status } = await supabase
        .from('replies')
        .select()
        .eq('comment_id', comment_id)

    return { data }
}

const addComment = async (
    { author_id, comment, post_id } :
    { author_id: string, comment: string, post_id: string 
}) => {
    const { error, status } = await supabase
        .from('comments')
        .insert({ author_id, comment, post_id })

    return { error, status }
}

const addReply = async (
    { author_id, comment, comment_id } :
    { author_id: string, comment: string, comment_id: string }
) => {
    const { error, status } = await supabase
        .from('replies')
        .insert({ author_id, comment, comment_id })

    return { error, status }
}

const deleteComment = async ({ id, type } : { id: string, type: string }) => {
    const { error, status } = await supabase
        .from(type)
        .delete()
        .eq('id', id)
    
    return { error, status }
}

export { getComments, getReplies, addComment, addReply, deleteComment }