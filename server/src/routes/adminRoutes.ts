import express, { RequestHandler } from 'express';
import { getBatchAnalysisByYearQuarter, getAllUniqueBatches, getBatchAnalysisByBatchNo, getPersonById } from '../controllers/adminController';

const router = express.Router();

// Get current batch analysis
router.get('/:aid/dashboard/batch', getBatchAnalysisByYearQuarter as RequestHandler);

// Get all unique batches
router.get('/:aid/dashboard/batch', getAllUniqueBatches);

router.get('/:aid/dashboard/batch/:batch_no', getBatchAnalysisByBatchNo as RequestHandler);

router.get('/:aid/dashboard/person/:pid', getPersonById as RequestHandler);

export default router; 