import React from 'react'
import { setSearchQuery } from '../store/postSlice'
import { useDispatch } from '../store'

const SearchBar = () => {
    const dispatch = useDispatch()

    //handle the search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value))
    }

    return (
        <input
            type="text"
            placeholder="Search by title or userId"
            // value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md mr-2"
        />
    )
}

export default SearchBar
