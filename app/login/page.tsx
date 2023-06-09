import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import LoginForm from './LoginForm'
import type { Database } from '@/lib/database.types'

const Login = async () => {

    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
  
    return <LoginForm session={session} />
}

export default Login