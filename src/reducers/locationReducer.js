import {LOAD_DATA, UPDATE_LOCATION} from '../actions/types';


let locationReducer = (state, action) => {
    //initialize state
    if (state === undefined) {
        state = {
            data: [],
            newCoord: 29.7544285,
        }
    }
    console.log(action.type)
    
    switch (action.type) {
        case LOAD_DATA:
            // console.log("reducer is called");
            let newState = {
                ...state,
                data:action.payload
            }
            // console.log(newState)
            return newState


            case UPDATE_LOCATION:
                console.log("in reducer UPDATE_LOCATION payload", action.payload)
                return{
                    ...state,
                    newCoord: action.payload
                }


            // case LOCATION_RECORDS:



        // // case ADD_COUNTRY:
        // //     if (state.selected.includes(action.payload)) {
        // //         // console.log("xxxxxxxxxxxxxxxxxxxxxxExistedxxxxxxxxxxxxxxxxxxx");
        // //         alert("Entry is already selected");
        // //         return state;

        // //     }

        // //     else if (state.selected.length >= 8) {
        // //         alert("You may select up to 8 to study,Too Many Selected!");
        // //         return state;
        // //     }

        //     return {
        //         ...state,
        //         selected: state.selected.concat(action.payload)
        //     }



        // case DELETE_COUNTRY:

        //     let updatedList = state.selected.filter(countryObj => {
        //         console.log(countryObj.Country, action.region.Country);
        //         return countryObj.Country !== action.region.Country

        //     })
        //     console.log("updatedLIst", updatedList);

        //     return {
        //         ...state,
        //         selected: updatedList
        //     }

        default:
            // console.log(state.data)
            return state;
    }
}

export default locationReducer