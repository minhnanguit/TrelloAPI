import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// route Create New Board
Router.route('/')
  .get(authMiddleware.isAuthorized, boardController.getBoards)
  .post(authMiddleware.isAuthorized, boardValidation.createNew, boardController.createNew) // chi khoi tao chu kh goi ham createNew

// route Get & Put Details Board
Router.route('/:id')
  .get(authMiddleware.isAuthorized, boardController.getDetails)
  .put(authMiddleware.isAuthorized, boardValidation.update, boardController.update)

// route dnd card between different column
Router.route('/supports/moving_cards')
  .put(authMiddleware.isAuthorized, boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)

export const boardRoute = Router
