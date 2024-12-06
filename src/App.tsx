import './App.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes'

const App = () => {

    console.log('version 1.1.8')

    return <RouterProvider router={Routes} />
}

export default App
