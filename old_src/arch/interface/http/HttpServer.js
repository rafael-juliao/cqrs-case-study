import express from 'express'

export default ({ httpRouter }) => ({
    listen: async () => {
        const app = express()
        app.use('/api', httpRouter)
        app.listen()
    }
})