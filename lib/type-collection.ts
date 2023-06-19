import { Database } from './database.types'

export type Post = Database['public']['Tables']['posts']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']