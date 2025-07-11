// Dung joi de validate du lieu
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'stringl.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal to 5 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Description is required',
      'stringl.empty': 'Description is not allowed to be empty',
      'string.min': 'Description length must be at least 3 characters long',
      'string.max': 'Description length must be less than or equal to 5 characters long',
      'string.trim': 'Description must not have leading or trailing whitespace'
    }),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // kiem tra du lieu nhan duoc tu FE co thoa voi correctCondition kh, abortEarly: false de no console.log ra het loi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate du lieu hop le thi cho request di tiep den tang Controller
    next()
  } catch (error) {
    const messageError = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, messageError)
    next(customError)
  }
}

const update = async (req, res, next) => {
  /// Truong hop update thi kh goi ham required()
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true // cho phep kh can validate cac fields unknown (truong hop nay la columnOrderIds)
    })
    next()
  } catch (error) {
    const messageError = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, messageError)
    next(customError)
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  const correctCondition = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const messageError = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, messageError)
    next(customError)
  }
}

export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumn
}
