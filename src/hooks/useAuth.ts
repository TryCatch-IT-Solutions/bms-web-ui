import { signOut } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    const navigate = useNavigate()

    const {
        mutate: signOutMu,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            // Clear any local user data if needed
            console.log('here')
            localStorage.clear()

            // Redirect to the login page or any other desired route
            navigate('/sign-in')
        },
        onError: (error) => {
            console.error('Sign out failed:', error)
        },
    })

    return {
        signOut: signOutMu, // Function to trigger sign-out
        isPending, // Indicates if the request is in progress
        isError, // Indicates if an error occurred
        error, // Error details, if any
    }
}
