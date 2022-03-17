const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;

  var images = [
    'https://images.pexels.com/photos/2797318/pexels-photo-2797318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2007/animal-dog-pet-cute.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3433366/pexels-photo-3433366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/7444093/pexels-photo-7444093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4529775/pexels-photo-4529775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/7112208/pexels-photo-7112208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4224125/pexels-photo-4224125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5205386/pexels-photo-5205386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/7210631/pexels-photo-7210631.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/6542554/pexels-photo-6542554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  ];

  var randomNum = Math.floor(Math.random() * 11);

  try {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image: images[randomNum],
    });

    newDog.addTemperaments(temperament);

    return res.json(newDog);
  } catch (error) {
    res.status(400).send({ msg: 'Invalid parameters for dog creation' });
  }
});

module.exports = router;
