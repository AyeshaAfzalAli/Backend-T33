import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Person from '../models/Person';

// GET: All persons created by or assigned to a volunteer
export const getMyPersons = async (req: Request, res: Response) => {
    const { vname } = req.params;

    try {
        const people = await Person.find({
            'statusHistory.status': 'non-trafficked',
            createdBy: vname
        });

        res.send(people);
    } catch {
        res.status(500).send({ error: 'Failed to fetch persons' });
    }
};


// GET: One person
export const getPersonById = async (req: Request, res: Response) => {
    const { vname, pname } = req.params;

    try {
        const person = await Person.findOne({
            name: pname,
            createdBy: vname,
            'statusHistory.status': 'non-trafficked'
        });

        if (!person) return res.status(404).send({ error: 'Person not found or unauthorized' });
        res.send(person);
    } catch {
        res.status(500).send({ error: 'Failed to fetch person' });
    }
};



// POST: Create new person
export const createPerson = async (req: Request, res: Response) => {
    const { vname } = req.params;
    const { assignedTo } = req.body;

    try {
        const person = await Person.create({
            ...req.body,
            createdBy: new Types.ObjectId(String(vname)),
            assignedTo: new Types.ObjectId(String(assignedTo || vname)),
            statusHistory: [{ status: 'non-trafficked', date: new Date() }],
        });

        res.status(201).send(person);
    } catch {
        res.status(500).send({ error: 'Failed to create person' });
    }
};



// DELETE: Remove a person
export const deletePerson = async (req: Request, res: Response) => {
    const { vname, pname } = req.params;

    try {
        const person = await Person.findOneAndDelete({
            name: pname,
            createdBy: vname,
            'statusHistory.status': 'non-trafficked'
        });

        if (!person) return res.status(404).send({ error: 'Person not found or unauthorized' });
        res.send({ success: true, message: 'Person deleted' });
    } catch {
        res.status(500).send({ error: 'Failed to delete person' });
    }
};

// serve form for updating person -- get
export const serveForm = async (req: Request, res: Response) => {
    const { vname, pname } = req.params;
    try {
        const person = await Person.findOne({
            name: pname,
            createdBy: vname,
        });
        if (!person) return res.status(404).send({ error: 'Person not found or unauthorized' });
        res.send(person);
    } catch {
        res.status(500).send({ error: 'Failed to serve form' });
    }
}

// patch -- update person
export const updatePerson = async (req: Request, res: Response) => {
    const { vname, pname } = req.params;
    try {
        const person = await Person.findOneAndUpdate({
            name: pname,
            createdBy: vname,
        }, req.body, { new: true });
        if (!person) return res.status(404).send({ error: 'Person not found or unauthorized' });
        res.send(person);
    } catch {
        res.status(500).send({ error: 'Failed to update person' });
    }
}
