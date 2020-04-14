module.exports = {
    create: handler => async (req, res, next) => {
        try {
            const result = await handler(req)
            res.status(200).json(result).end()
        } catch (err) {
            next(err)
        }
    }
}