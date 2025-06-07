import { Request, Response } from 'express';
import Person from '../models/Person';

export const createPerson = async (req: Request, res: Response) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create person' });
  }
};

export const getPersons = async (_req: Request, res: Response) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
};