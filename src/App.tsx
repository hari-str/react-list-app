import { Provider } from 'react-redux'
import PostList from './components/PostList'
import { store } from './store'
import './App.css'

function App() {
    return (
        <Provider store={store}>
            <PostList />
        </Provider>
    )
}

export default App
