import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import axios from 'axios'
import { navigate } from '../navigationRef'
axios.defaults.baseURL="http://localhost:3000"


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload}
        case 'signin':
            return { errorMessage: '', token: action.payload }
        case 'clear_error_message':
            return { ...state, errorMessage: ''}
        case 'signout':
            return { token: null, errorMessage: ''}
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token){
        dispatch({ type: 'signin', payload: token })
        navigate('Map')
    } else{
        navigate('Signup')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const signup = (dispatch) => async ({ email, password }) =>{
        try{
            const response = await axios.post('/signup', {email, password})
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token})

            navigate('Map')
        }
        catch (err){
            dispatch({ 
                type: 'add_error', 
            payload: 'Something went wrong with sign up, try again' 
        })
        }
    }



const signin = (dispatch) => async ({ email, password }) =>{
        try{
            const response = await axios.post('/signin', { email, password })
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'signin', payload: response.data.token})
            navigate('Map')
        }
        catch (err){
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in, try again'
            })
        }
    }


const signout = (dispatch) => async () =>{
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' })
    navigate('loginFlow')
}


export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin},
    { token: null, errorMessage: '' }
);