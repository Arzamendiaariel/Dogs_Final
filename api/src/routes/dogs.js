require('dotenv').config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { Router } = require('express');
const router = Router();

//genero funciones auxiliares (podrían ser modularizadas  como el archivo getTemperament)
const getApiDogs = async () => {
  //axios pide la infromación a la API
  const wholeApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  //genero un array auxiliar donde al final estarán todos los perros
  var dogsFromApi = [];
  //itero en la información traida de la api; tengo que hacer .data para poder manejarlo como un array;
  //guardo cada perro en una auxiliar ( var dog)
  for (var i = 0; i < wholeApi.data.length; i++) {
    var dog = wholeApi.data[i];
    //empiezo a corregir la información que trae la APi porque viene bastante rota
    if (dog.weight.metric === 'NaN') {
      //primero chequeo que no sea un numero
      var imperialWeight = dog.weight.imperial.split(' '); //tomo el peso que esta en string, lo convierto en un array de elementos
      var metricWeight = [
        Math.round(0.45 * Number(imperialWeight[0])), //paso el peso imperial a metrico
        Math.round(0.45 * Number(imperialWeight[2])),
      ];
      dog.weight.metric = metricWeight.join(' - '); //lo vuelvo a hacer string
    }
    if (dog.height.metric === 'NaN') {
      //hago lo mismo con la altura
      var imperialHeight = dog.height.imperial.split(' ');
      var metricHeight = [
        Math.round(2.54 * Number(imperialHeight[0])),
        Math.round(2.54 * Number(imperialHeight[2])),
      ];
      dog.height.metric = metricHeight.join(' - ');
    }

    var avgWeight = dog.weight.metric.split(' '); //lo vuelvo a hacer un array para trabajarlo y ponerlo en un auxiliar
    //saco el peso promedio
    if (avgWeight.length > 1) {
      if (avgWeight[0] === 'NaN') {
        avgWeight = avgWeight[2];
      } else if (avgWeight[2] === 'NaN') {
        avgWeight = avgWeight[0];
      } else {
        avgWeight = (Number(avgWeight[0]) + Number(avgWeight[2])) / 2;
      }
    } else {
      avgWeight = Number(avgWeight[0]);
    }
    //genero una variable tipo objeto que posee toda la data que voy a usar
    var dogDetails = {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      avgWeight,
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament,
    };
    dogsFromApi.push(dogDetails); //pusheo en el array auxiliar que habia creado antes cada perro iterado
  }
  return dogsFromApi; //finalmente tengo un array con todos los perros
};

const getDbDogs = async () => {
  //meto en un auxiliar los perros que pueda tener en la DB incluyendo los de la tabla temperament que se cargan en la db
  var dogsDB = await Dog.findAll({ include: { model: Temperament } });
  //genero un array auxiliar donde finalmente estaran mis perros de la base de datos
  var formattedDogsDB = [];
  //tomo cada perro de la DB y los pongo en una auxiliar (obviamente si es que existen perros por eso el length >0)
  if (dogsDB.length > 0) {
    for (var i = 0; i < dogsDB.length; i++) {
      var dogDB = dogsDB[i];
      //genero una auxiliar para almacenar los temperamentos como strings
      var temperamentStr = '';
      //tomo los temperamentos de los perros de la DB
      if (dogDB.temperaments.length > 0) {
        for (var j = 0; j < dogDB.temperaments.length; j++) {
          var dogTemperament = dogDB.temperaments[j].name;
          //acumulo los temperamentos en la auxiliar creada
          temperamentStr += dogTemperament + ', ';
        }
        temperamentStr = temperamentStr.substring(0, temperamentStr.length - 2); //limpio el texto
      }
      //genero una auxiliar que es un array con los pesos
      var avgWeight = dogDB.weight.split(' ');

      if (avgWeight.length > 1) {
        //genero el promedio de pesos eludiendo el guión que esta en el indice 1
        avgWeight = (Number(avgWeight[0]) + Number(avgWeight[2])) / 2;
      } else {
        avgWeight = Number(avgWeight[0]); //en algunos casos no tengo 2 elementos
      }
      //genero una variable que será el objeto perro con todas sus propiedades
      var dogDetails = {
        id: dogDB.id,
        name: dogDB.name,
        height: dogDB.height,
        weight: dogDB.weight,
        avgWeight,
        life_span: dogDB.life_span,
        created_in_db: dogDB.created_in_db,
        temperament: temperamentStr,
        image: dogDB.image,
      };
      formattedDogsDB.push(dogDetails); //pusheo los perros en el array de base de datos
    }
  }

  // return dogsDB;
  return formattedDogsDB;
};

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();

  const allDogs = dbDogs.concat(apiDogs); //todos los perros son la suma de los api y db

  return allDogs;
};

// aca empezamos con las rutas

router.get('/', async (req, res) => {
  //requisito del reedme para poder buscar por query por nombre de raza
  const name = req.query.name;

  try {
    //variable dogs donde tengo el total de perros generados en la función anterior
    const dogs = await getAllDogs();
    //aca genero la posibilidad que venga o no el nombre por query y devuelvo un array con los perros que coinciden ese nombre
    if (name) {
      var dogsFoundByName = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      //aca si no hay perros que coincidan con ese nombre devuelvo un error
      if (!dogsFoundByName.length) {
        return res.status(404).send({ info: 'Dog not found' });
      }
      //retorno lo encontrado
      return res.send(dogsFoundByName);
    }
    res.json(dogs);
  } catch (error) {
    console.log(error);
  }
});

// GET --- Get Dog by ID

router.get('/:id', async (req, res) => {
  //busqueda de perro por Id enviado por params
  const id = req.params.id;
  //como se que los perros de la api tienen un ID menor a 3
  //filtro de ese modo si se los traigo de api o db
  try {
    if (id.length > 3) {
      //traigo los perros de la DB
      const dogsFromDb = await getDbDogs();
      //array con los perros encontrados con ese id
      var dogFoundByDbId = dogsFromDb.find((dog) => dog.id === id);

      if (!dogFoundByDbId) {
        return res.status(404).send({ info: 'Dog not found' });
      }
      return res.send(dogFoundByDbId);
    }
    //si el id no es un numero los llamo de la api (es string)
    if (!isNaN(id)) {
      //traigo los perros de la api
      const dogsFromApi = await getApiDogs();
      //genero array filtro por id
      var dogFoundById = dogsFromApi.find((dog) => dog.id == id);
      //si no encuentro mando error
      if (!dogFoundById) {
        return res.status(404).send({ info: 'Dog not found' });
      }

      return res.send(dogFoundById);
    }
    res.status(400).send({ info: 'Incorrect ID' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
