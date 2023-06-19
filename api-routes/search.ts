import supabase from '@/lib/supabase-client'

const getTitleSearch = async (query: string) => {
    const { data, error, status } = await supabase
        .from('posts')
        .select()
        .ilike('title', `%${query}%`)

    return { data, error, status }
}

export { getTitleSearch }