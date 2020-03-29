import logger from '../arch/Logger.mjs'
import offersModel from './OffersModel.mjs'
import express from 'express'
const { Router } = express

export default () => {
    const offersRouter = Router()
    offersRouter.post('/offers', async (req, res, next) => {
        try {
            const offer = await offersModel.create(req.body)
            res.status(201).json(offer).end()
        } catch (err) {
            next(err)
        }
    })
    offersRouter.patch('/offers/:offerId/status', async (req, res, next) => {
        try {
            const offer = await offersModel.changeStatus(req.params.offerId, req.body.status)
            res.status(200).json(offer).end()
        } catch (err) {
            next(err)
        }
    })
    logger.info(`[HTTP] Created offers controller`)
    return offersRouter
}