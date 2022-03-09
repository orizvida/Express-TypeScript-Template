import express from 'express';
import { NAMESPACE, sampleFunction } from '../controllers/sampleController';
import { sampleValidate, sampleValidationRules } from '../validation/sampleValidator';

const router = express.Router();
router.post(`/${NAMESPACE}/:id`,sampleValidationRules(),sampleValidate,sampleFunction);


export default router;