import { NextFunction, query, Request, Response } from 'express';
import { validationResult ,body, param } from 'express-validator';
import { Req, Res } from '../core/HttpContext';
import Sample from '../interfaces/sample';

const sampleValidationRules = () => {
    return [
      body('name').notEmpty().withMessage('Name is a required field')
      .isLength({min:3}).withMessage('Name must be at least 3 characters long')
      .isLength({max:20}).withMessage('Name can not be longer than 20 characters'),
      param('id').notEmpty().isNumeric()
    ]
  }
  
  const sampleValidate = (req: Req<any,{id:string},Sample,{}>, res: Response, next:NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors:any = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  
 export  {
    sampleValidationRules,
    sampleValidate,
  }