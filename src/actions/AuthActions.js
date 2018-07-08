import {
    AsyncStorage
} from "react-native";

const accessTokenKey = 'access_token_key';//ключ по которому мы будем сохранять/получать данные в AsyncStore

//далее иду ключи экшенов, по ним редюсеры понимаю как надо изменить глобальный стейт
//смотри файл reducers/AuthReducer.js
export const SET_TOKEN = "SET_TOKEN";
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
                    type: SET_TOKEN,
                    accessToken
                });
                dispatch(toggleProcess(false));
                return true;
            }
            dispatch(toggleProcess(false));
            return false;

        }
    },
    // пример авторизации
    logIn(login, password){
        return async (dispatch, getState)=>{
            dispatch(toggleProcess(true));

            const token = "sdfnm3234m,iy23g4j";

            try {
                let response = await fetch(
                    'https://example.com/login',
                    {
                        method: 'POST',
                        headers: {
                           /* Accept: 'application/json',
                            'Content-Type': 'application/json',*/
                             Authorization: `Bearer ${token}`

                        },
                        body: JSON.stringify({
                            login: login,
                            password: password,
                        }),
                    }
                );
                let responseJson = await response.json();

                if(responseJson.access_token){
                    await AsyncStorage.setItem(accessTokenKey, responseJson.access_token);
                    dispatch({
                        type: SET_TOKEN,
                        accessToken: responseJson.access_token
                    });
                    return null;
                }
                return responseJson.msg;
            } catch (error) {
                dispatch(toggleProcess(false));
                console.error(error);
            }
        }
    }
}