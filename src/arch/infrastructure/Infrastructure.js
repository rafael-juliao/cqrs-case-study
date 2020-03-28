export default ({ database, queue }) => ({
    setup: async () => {
        await database.connect()
        await queue.connect()
    }
})