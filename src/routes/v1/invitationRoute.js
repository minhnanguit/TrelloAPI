import express from 'express'
import { invitationValidation } from '~/validations/invitationValidation'
import { invitationController } from '~/controllers/invitationController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/')
  // Get invitations by User
  .get(
    authMiddleware.isAuthorized,
    invitationController.getInvitations
  )

Router.route('/board')
  .post(
    authMiddleware.isAuthorized,
    invitationValidation.createNewBoardInvitation,
    invitationController.createNewBoardInvitation
  )

Router.route('/board/:invitationId')
  .put(
    authMiddleware.isAuthorized,
    invitationController.updateStatusInvitation
  )

export const invitationRoute = Router
