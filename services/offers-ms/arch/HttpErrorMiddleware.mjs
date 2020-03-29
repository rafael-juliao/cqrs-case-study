export default () => (err, req, res, next) => {
    const errorString = err.message
    const [code, message] = errorString.split('|')
    res.status(code).json({ reason: message }).end()
}