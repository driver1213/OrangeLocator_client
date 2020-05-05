import {LOAD_DATA, UPDATE_LOCATION , SELECT_DEST ,ADD_FAV} from './types';


export const loadAllData = (payload) => ({type: LOAD_DATA, payload});

export const loadData = () => dispatch =>{
  //  fetch('http://192.168.31.43:3000/stores')//Richard's Local IP
   fetch('http://192.168.31.43:3000/stores')//Richard's Local IP
      .then(res => res.json())
      .then(allData => {
        dispatch(loadAllData(allData.data))
      });
//   dispatch(loadAllData(data.data))

}

export const updateLocation = (payload) => ({type: UPDATE_LOCATION, payload});

export const selectDest = (payload) => ({type: SELECT_DEST, payload});


