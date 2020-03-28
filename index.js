(async () => {
    import Injection from './src/Injection'
    const { application } = Injection.cradle
    await application.start()
})()