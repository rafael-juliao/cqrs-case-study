const errorMapper = error => error.details.map(({ message, path }) => ({ message, path: path.join('.') }))

module.exports = {
    create: ({ params, query }) => (req, res, next) => {
        const errors = []
        
        if (params) {
            const { error } = params.validate(req.params)
            if (error)
                errors = errorMapper(error)
        }
        if (query) {
            const { error } = query.validate(req.query)
            if (error)
                errors = [ ...errors, ...errorMapper(error)]
        }
        if (errors.length)
            return res.status(400).json({ errors }).end()
        
        next()    
    }
}