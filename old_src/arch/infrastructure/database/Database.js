export default ({ mongoDb }) => ({
    connect: async () => {
        await mongoDb.connect()
    }
})