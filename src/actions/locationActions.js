import {LOAD_DATA} from './types';
import data from '../../constants/sampleData.json'

export const loadAllData = (payload) => ({type: LOAD_DATA, payload})

export const loadData = () => dispatch =>{
   fetch('http://192.168.31.43:3000/stores')
      .then(res => res.json())
      .then(allData => {
        dispatch(loadAllData(allData.data))
      });
//   dispatch(loadAllData(data.data))

}