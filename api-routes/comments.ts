import supabase from '@/lib/supabase-client'

const getComments = async (post_id : string) => {
    const { data, error, status } = await supabase
        .from('comments')
        .select()
        .eq('post_id', post_id)

    return data
}

const addComment = async ({ author_id, comment, post_id } : { author_id: string, comment: string, post_id: string }) => {
    const { error, status } = await supabase
        .from('comments')
        .insert({ author_id, comment, post_id })

    return { error, status }
}

const deleteComment = async (id: string) => {
    const { error, status } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
    
    return { error, status }
}

export { getComments, addComment, deleteComment }