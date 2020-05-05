import { LOAD_DATA, UPDATE_LOCATION, SELECT_DEST, ADD_FAV, DEL_FAV } from '../actions/types';


let locationReducer = (state, action) => {
    //initialize state
    if (state === undefined) {
        state = {
            data: [],

            newCoord: "-95.366296,29.757723",

            destInfo: {
                "name": "Wells Fargo Plaza",
                "info": {
                    "phone": "(713) 654-2100",
                    "address": "1000 Louisiana St, Houston, TX 77002"
                },
                "wifiMacAddress": "0.0.0.0",
                "imgUrl": "",
                "category": "Bank",
                "longitude": -95.3681076,
                "latitude": 29.7582497,
            },

            loading: false,

            locationLog: [],

            fav: [
                
                {
                "info": {
                "phone": "(713) 654-1300",
                "address": "1001 Louisiana St, Houston, TX 77002"
                },
                "_id": "5eabb53700b1fa158dde2f4b",
                "name": "District 7 Grill",
                "imgUrl": "",
                "category": "Food",
                "latitude": 29.7579896,
                "longitude": -95.367489
                }

            ],



        }
    }
    console.log(action.type)

    switch (action.type) {
        case LOAD_DATA:
            // console.log("reducer is called");
            let newState = {
                ...state,
                data: action.payload
            }
            // console.log(newState)
            return newState


        case UPDATE_LOCATION:
            console.log("in reducer UPDATE_LOCATION payload", action.payload)
            let tempLocationLog = [...state.locationLog];
            tempLocationLog.unshift(action.payload);

            return {
                ...state,
                newCoord: action.payload,
                locationLog: [...tempLocationLog]

            }

        case SELECT_DEST:
            // console.log("Reducer payload for select NewDest",action.payload)
            return {
                ...state,
                destInfo: action.payload,

            }

   
        case ADD_FAV:
            // if (state.fav.includes(action.payload)) {
            //     // console.log("xxxxxxxxxxxxxxxxxxxxxxExistedxxxxxxxxxxxxxxxxxxx");
            //     alert("You've Aready Added");
            //     return state;
            // } else {
                // console.log("before you Add Fav, the Fav is", state.fav)
                console.log("Trying to concat state to fav array")
                console.log(state.fav)
                return {
                    ...state,
                    fav: state.fav.concat(action.payload)
                }
            // }


        case DEL_FAV:

            let temFav = state.fave.filter(favObj => {

                return favObj._id !== action.payload._id

            })
            console.log("temFav", temFav);

            return {
                ...state,
                fave: TemFav
            }

        default:
            // console.log(state.data)
            return state;
    }
}

export default locationReducer