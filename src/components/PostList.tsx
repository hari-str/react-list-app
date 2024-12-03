import React from 'react'
import SearchBar from './SearchBar'
import FilterDropdown from './FilterDropdown'
import ListofPosts from './ListofPosts'

const PostList: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">List with Search and Filter</h1>
            <div className="flex mb-4 justify-end flex-wrap gap-4 md:gap-0">
                <SearchBar />
                <FilterDropdown />
            </div>
            {/* list of posts  */}
            <ListofPosts />
        </div>
    )
}

export default PostList
