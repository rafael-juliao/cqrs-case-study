export default ({ logger, httpServer }) => ({
    start: async () => {
        await httpServer.listen()
    }
})