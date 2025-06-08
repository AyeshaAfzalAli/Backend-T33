import express , {RequestHandler} from 'express';
import { getMyPersons, getPersonById, createPerson, deletePerson, serveForm, updatePerson } from '../controllers/volunteerController';

const router = express.Router();

router.get('/:vid/Person', getMyPersons as RequestHandler);
router.get('/:vid/Person/:pid', getPersonById as RequestHandler);
router.post('/:vid/Person', createPerson as RequestHandler);
router.delete('/:vid/Person/:pid', deletePerson as RequestHandler);
router.get('/:vid/Person/:pid/edit', serveForm as RequestHandler);
router.patch('/:vid/Person/:pid', updatePerson as RequestHandler);

export default router;
