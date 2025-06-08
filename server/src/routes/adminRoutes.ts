import express, { RequestHandler } from 'express';
import { getBatchAnalysisByYearQuarter, getAllUniqueBatches, getBatchAnalysisByBatchNo, getPersonById } from '../controllers/adminController';

const router = express.Router();

router.get('/:aname/dashboard/batch/:year/:quarter', getBatchAnalysisByYearQuarter as RequestHandler);
router.get('/:aname/dashboard/batch', getAllUniqueBatches);
router.get('/:aname/dashboard/batch/:batch_no', getBatchAnalysisByBatchNo as RequestHandler);
router.get('/:aname/dashboard/person/:pname', getPersonById as RequestHandler);

export default router; 