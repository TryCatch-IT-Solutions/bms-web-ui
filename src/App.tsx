import { RouterProvider } from 'react-router-dom'
import Routes from './routes'

function App() {
    console.log('BMS v.1.0.0')
    return <RouterProvider router={Routes} />
}

export default App
