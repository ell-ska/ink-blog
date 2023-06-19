import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './database.types'

const supabase = createClientComponentClient<Database>()

export default supabase