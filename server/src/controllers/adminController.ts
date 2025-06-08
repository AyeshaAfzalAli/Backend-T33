import { Request, Response } from 'express';
import Person from '../models/Person';
import { getBatch, getYandQ, getBatchNo } from '../utils/helper';

// get -- admin/:aid/dashboard/batch/:year/:quarter
export const getBatchAnalysisByYearQuarter = async (req: Request, res: Response) => {
    try {
        const batch = getBatchNo(parseInt(req.params.year), parseInt(req.params.quarter));
        const persons = await Person.find({ statusHistory: { $elemMatch: { batch: batch } } });
        if (!persons) return res.status(404).json({ error: 'No persons found' });
        res.json({ persons });
    } catch {
        res.status(500).json({ error: 'Failed to fetch batch analysis' });
    }
};

// get -- admin/:aid/dashboard/batch/:batch_no
export const getBatchAnalysisByBatchNo = async (req: Request, res: Response) => {
    try {
        const batch = getYandQ(parseInt(req.params.batch_no));
        const persons = await Person.find({ statusHistory: { $elemMatch: { batch: batch } } });
        if (!persons) return res.status(404).json({ error: 'No persons found' });
        res.json({ persons });
    } catch {
        res.status(500).json({ error: 'Failed to fetch batch analysis' });
    }
}

// GET admin/:aid/dashboard/batch - Get all unique batches
export const getAllUniqueBatches = async (_req: Request, res: Response) => {
    try {
        const uniqueBatches = await Person.aggregate([
            // Unwind the statusHistory array to create a document for each status
            { $unwind: "$statusHistory" },
            // Group by batch year and quarter to get unique combinations
            {
                $group: {
                    _id: "$statusHistory.batch",
                    count: { $sum: 1 }
                }
            },
            // Sort by year and quarter
            {
                $sort: {
                    "_id.year": 1,
                    "_id.quarter": 1
                }
            }
        ]);

        res.json({
            batches: uniqueBatches.map(item => ({
                year: item._id.year,
                quarter: item._id.quarter,
                count: item.count
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch unique batches' });
    }
};

// GET admin/:aid/Persons/:pid - Get all persons for an admin (user)
export const getPersonById = async (req: Request, res: Response) => {
    try {
        const { pid } = req.params;
        const persons = await Person.findById({ _id: pid });
        if (!persons) return res.status(404).json({ error: 'No persons found' });
        res.json({ ...persons.statusHistory });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch persons' });
    }
};