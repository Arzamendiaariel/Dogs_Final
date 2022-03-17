// import axios from "axios";

// export function getDogs() {

//   return async function(dispatch) {
    
//     var allDogs = await axios.get('http://localhost:3001/dogs');
    
//     return dispatch({
//       type: 'GET_DOGS',
//       payload: allDogs.data
//     });
//   }
// }

// export const getTemperaments = () => {
  
//   fetch('http://localhost:3001/temperament')
//     .then(response => response.json())
//     .then(data => {
//       dispatch({
//         type: 'GET_TEMPERAMENTS',
//         payload: data
//       })
//     })
// }