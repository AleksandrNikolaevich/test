import {
    AsyncStorage
} from "react-native";

const accessTokenKey = 'access_token_key';//ключ по которому мы будем сохранять/получать данные в AsyncStore

//далее иду ключи экшенов, по ним редюсеры понимаю как надо изменить глобальный стейт
//смотри файл reducers/AuthReducer.js
export const CHECK_TOKEN = "CHECK_TOKEN";
export const TOGGLE_PROCESS = "TOGGLE_PROCESS";

const toggleProcess = (state)=> {
    return {
        type: TOGGLE_PROCESS,
        state
    }
};

export default {
    checkToken(){
        //благодаря redux-thunk мы можем выполнять асинхронные действия
        //dispatch() - устанавливает новое соотояние, принимает объект экшена
        //getState() - функция получает текущее состояние приложения
        return async (dispatch, getState) =>{
            dispatch(toggleProcess(true));
            const accessToken = await AsyncStorage.getItem(accessTokenKey);
            if(accessToken){
                dispatch({
                    type: CHECK_TOKEN,
                    accessToken
                });
                dispatch(toggleProcess(false));
                return true;
            }
            dispatch(toggleProcess(false));
            return false;

        }
    }
}