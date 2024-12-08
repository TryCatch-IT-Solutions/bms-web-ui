import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import './index.css'

// Allows us to catch preload errors:
// e.g. When the old cache is still being fetched although there is a new build from recent deployment.
// Documentation: https://vitejs.dev/guide/build.html
// Usage: https://github.com/vitejs/vite/discussions/15897
window.addEventListener('vite:preloadError', (event) => {
    // event payload contains the error
    console.log('error at: ', event?.payload)
    // when error occurs, reloads the app for the new cache instead of throwing white screen with error exception.
    window.location.reload()
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} position='right' />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
)
