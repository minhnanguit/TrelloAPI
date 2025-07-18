import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const columnId = await req.params.id
    const column = await columnService.getDetails(columnId)
    res.status(StatusCodes.OK).json(column)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const columnId = await req.params.id
    const updatedColumn = await columnService.update(columnId, req.body)
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}

const deleteColumnDetails = async (req, res, next) => {
  try {
    const columnId = await req.params.id
    const deletedColumn = await columnService.deleteColumnDetails(columnId)
    res.status(StatusCodes.OK).json(deletedColumn)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  getDetails,
  update,
  deleteColumnDetails
}
