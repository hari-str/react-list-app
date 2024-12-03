import { useDispatch, useSelector } from '../store'
import { Status } from '../types/enum'
import { getPosts } from '../store/postSlice'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Posts } from '../types'

const ListofPosts = () => {
    const dispatch = useDispatch()
    const { filteredData, status } = useSelector((state) => state.posts)

    const [data, setData] = useState<Posts[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect(() => {
        if (filteredData) {
            const newData = filteredData.slice(0, page * 20)
            setData(newData)
        }
    }, [filteredData, page])

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1)
    }

    if (status === Status.LOADING) {
        return <div className="text-center">Loading...</div>
    }

    if (status === Status.FAILED) {
        return <div>Failed to load posts.</div>
    }

    if (filteredData.length === 0) {
        return <div className="text-center">No posts found.</div>
    }

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={data.length < filteredData.length}
            loader={<h4 className="text-center">Loading...</h4>}
            // endMessage={<p className="text-center">No more posts to load!</p>}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((post, index) => (
                    <div key={index} className="p-4 border rounded-md shadow-md">
                        <p className="mb-2">{post.userId}</p>
                        <p className="mb-2">{post.title}</p>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default ListofPosts
