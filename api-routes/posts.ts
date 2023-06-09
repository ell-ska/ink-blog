import supabase from '@/lib/supabase-client'

const getPosts = async () => {
    const { data, error, status } = await supabase
        .from('posts')
        .select()

    return data
}

const getPost = async (slug : string) => {
    const { data, error, status } = await supabase
        .from('posts')
        .select()
        .eq('slug', slug)
        .single()

    return data
}

const addPost = async () => {

}

const deletePost = async () => {

}

const editPost = async () => {

}

export { getPosts, getPost, addPost, deletePost, editPost }
