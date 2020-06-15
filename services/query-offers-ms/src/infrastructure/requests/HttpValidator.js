const errorMapper = error => error.details.map(({ message, path }) => ({ message, path: path.join('.') }))

module.exports = {
    create: ({ params, query }) => (req, res, next) => {
        const details = []
        
        if (params) {
            const { error } = params.validate(req.params)
            if (error)
                details.push(...errorMapper(error))
        }
        if (query) {
            const { error } = query.validate(req.query)
            if (error)
                details.push(...errorMapper(error))
        }
        if (details.length)
            return res.status(400).json({
                message: 'Invalid Request',
                details
            }).end()
        
        next()    
    }
}