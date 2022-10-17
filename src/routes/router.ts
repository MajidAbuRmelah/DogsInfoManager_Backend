import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.post('/dog', controller.addDog);
router.put('/dog/:id', controller.updateDog);
router.get('/dogs', controller.getDogs);
router.get('/dog/:id', controller.getDog);
router.delete('/dog/:id', controller.deleteDog);

export = router;