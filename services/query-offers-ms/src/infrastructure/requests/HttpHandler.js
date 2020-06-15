module.exports = {
    create: controller => async (req, res, next) => {
        try {
            const result = await controller(req)
            res.status(200).json(result).end()
        } catch (err) {
            next(err)
        }
    }
}