import { Status } from './enum'

export interface DefaultRootProps {
    posts: PostsProps
}

export interface User {
    id: number
    name: string
}

export interface Posts {
    userId: number
    id: number
    title: string
    body: string
}

export interface PostsProps {
    posts: Posts[]
    users: User[]
    filteredData: Posts[]
    searchQuery: string
    filter: string | null
    status: Status
}
