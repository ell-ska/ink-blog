import supabase from '@/lib/supabase-client'
import { uploadImage } from '@/utils/upload-image'

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

const addPost = async (
    { title, slug, body, user_id, published, image } : 
    { title: string, slug: string, body: string, user_id: string, published: boolean, image: File | undefined }
) => {

    let cover_image

    if (image) {
        const { publicUrl, error } = await uploadImage(image)
        if (!error) cover_image = publicUrl
    }
    
    const { error, status } = await supabase
        .from('posts')
        .insert({ title, slug, body, user_id, published, cover_image })

    return { error, status }
}

const editPost = async (
    { id, title, slug, body, image } : 
    { id: string, title: string, slug: string, body: string, image: File | undefined }
) => {

    let cover_image

    if (image) {
        const { publicUrl, error } = await uploadImage(image)
        if (!error) cover_image = publicUrl
    }

    const { error, status } = await supabase
        .from('posts')
        .update({ title, slug, body, cover_image })
        .eq('id', id)

    return { error, status }
}

const deletePost = async (id: string) => {
    const { error, status } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    return { error, status }
}

export { getPosts, getPost, addPost, deletePost, editPost }
