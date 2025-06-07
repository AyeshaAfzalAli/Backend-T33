import { Router } from 'express';
import { createPerson, getPersons } from '../controllers/personController';

const router = Router();

router.post('/', createPerson);
router.get('/', getPersons);

export default router;