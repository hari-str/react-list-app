import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '../store'
import { getUsers, setFilter } from '../store/postSlice'

const FilterDropdown = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.posts)

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = e.target.value === 'all' ? null : parseInt(e.target.value, 10)
        dispatch(setFilter(userId))
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    return (
        <select onChange={handleFilter} className="p-2 border border-gray-300 rounded-md">
            <option value="all">All Users</option>
            {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    )
}

export default FilterDropdown
