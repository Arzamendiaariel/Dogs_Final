import { ActionTypes } from "../constants";
import axios from 'axios';

// export const setTemperaments = (temperaments) => {

//   return {
//     type: ActionTypes.SET_TEMPERAMENTS,
//     payload: temperaments
//   };
// };

export function getDogs() {

  return async function(dispatch) {

    var json = await axios.get('http://localhost:3001/dogs');

    return dispatch({
      type: ActionTypes.GET_DOGS,
      payload: json.data
    });
  };
};

export function getDogDetails(id) {

  return async function(dispatch) {

    var json = await axios.get(`http://localhost:3001/dogs/${id}`);

    return dispatch({
      type: ActionTypes.DOG_DETAILS,
      payload: json.data
    });
  };
};

export function getDogsByName(name) {

  return async function(dispatch) {
    
    try {
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);

      return dispatch({
        type: ActionTypes.GET_DOGS_BY_NAME,
        payload: json.data
      });

    } catch(err) {
      return dispatch({
        type: ActionTypes.GET_DOGS_BY_NAME,
        payload: []
      })
    }
    
  };
};

export function getTemperaments() {

  return async function(dispatch) {

    var json = await axios.get('http://localhost:3001/temperament');

    return dispatch({
      type: ActionTypes.GET_TEMPERAMENTS,
      payload: json.data
    });
  };
};

export function filterDogsByTemperament(payload) {
  
  return {
    type: ActionTypes.FILTER_BY_TEMPERAMENT,
    payload
  }
}

export function filterDogsBySource(payload) {

  return {
    type: ActionTypes.FILTER_DOGS_BY_SOURCE,
    payload
  }
}

export function sortByName(payload) {
  return {
    type: ActionTypes.ORDER_BY_NAME,
    payload
  }
}

export function sortByWeight(payload) {
  return {
    type: ActionTypes.ORDER_BY_WEIGHT,
    payload
  }
}

export function postDog(payload) {
  console.log(payload);
  return async function(dispatch) {

    try {

      var json = await axios.post("http://localhost:3001/dog/", payload);
      console.log(json);

      return dispatch({
        type: ActionTypes.POST_DOG,
        payload: json.data
      });
      // return json;
    } catch(err) {
      console.log(err);
    }
  };
}
