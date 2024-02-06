import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* This file configures vite to allow the client side code to run
on port 3000 and the server side code to run on port 3001.*/
export default defineConfig({

    plugins: [react()],

    server: {

        port: 3000,
        open: true,
        proxy: {

            '/graphql': {
                
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true
            }
        }
    },

    test: {
        
        globals: true,
        environment: 'happy-dom'
    }
})
