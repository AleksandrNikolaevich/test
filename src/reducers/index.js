import { combineReducers } from 'redux';
import auth from "./AuthReducer";
//import example from "./ExampleReducer";

//тут мы соединяем все редюсеры
export default combineReducers({
    auth,
    //example
});