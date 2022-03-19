const { Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const getTemperamentsFromAPI = async () => {
  try {
    //tomo toda la info de la api (arreglo de objetos)
    const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    //creo un array  auxiliar
    var temperaments = [];
    //realizo un for para obtener solo los temperamentos de cada perro que estan en forma de string,
    //entonces los convierto a un array con los temperamentos de cada raza y los meto en el array auxiliar (concat)
    for (var i = 0; i < dogs.data.length; i++) {
      var dogTemperaments = dogs.data[i].temperament;
      if (dogTemperaments) {
        temperaments = temperaments.concat(dogTemperaments.split(', '));
      }
    }
    //creo otro array auxiliar y uso la función set que permite almacenar valores únicos de cualquier tipo para no repetir
    var uniqueTemperaments = [...new Set(temperaments)];
    //mapeo el array auxiliar y con elemento los meto en la base de datos; lo hacemos con find or create para volver
    //a asegurarnos que no voy a duplicar valores
    uniqueTemperaments.map((uniqueTemperament) => {
      Temperament.findOrCreate({
        where: {
          name: uniqueTemperament,
        },
      });
    });
    console.log('temperaments loaded in api/index.js');
  } catch (error) {
    console.log('error loading temperaments from API');
  }
};

module.exports = getTemperamentsFromAPI;
