import express , {RequestHandler} from 'express';
import { getMyPersons, getPersonById, createPerson, deletePerson, serveForm, updatePerson } from '../controllers/volunteerController';

const router = express.Router();

router.get('/:vname/Person', getMyPersons as RequestHandler);
router.get('/:vname/Person/:pname', getPersonById as RequestHandler);
router.post('/:vname/Person', createPerson as RequestHandler);
router.delete('/:vname/Person/:pname', deletePerson as RequestHandler);
router.get('/:vname/Person/:pname/edit', serveForm as RequestHandler);
router.patch('/:vname/Person/:pname', updatePerson as RequestHandler);

export default router;
