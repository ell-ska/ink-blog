import supabase from '@/lib/supabase-client'

const getUser = async (id : string) => {
    const { data, error, status } = await supabase
        .from('users')
        .select()
        .eq('id', id)
        .single()
        
    return data
}

export { getUser }