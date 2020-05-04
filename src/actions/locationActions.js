import {LOAD_DATA, UPDATE_LOCATION} from './types';
import data from '../../constants/sampleData.json'

export const loadAllData = (payload) => ({type: LOAD_DATA, payload});

export const loadData = () => dispatch =>{
   fetch('http://192.168.31.43:3000/stores')
      .then(res => res.json())
      .then(allData => {
        dispatch(loadAllData(allData.data))
      });
//   dispatch(loadAllData(data.data))

}

export const updateLocation = (payload) => ({type: UPDATE_LOCATION, payload});
