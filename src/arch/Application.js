export default ({ infrastructure, interface }) => ({
    start: async () => {
        await infrastructure.setup()
        await interface.start()
    }
})