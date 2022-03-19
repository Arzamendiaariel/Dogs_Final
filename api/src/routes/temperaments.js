const { Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  // res.send('temperaments working');

  try {
    //devuelvo los temperamentos de la db que guarde en el controller
    const temperaments = await Temperament.findAll({
      order: [['name', 'ASC']],
    });

    res.json(temperaments);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
