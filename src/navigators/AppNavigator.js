import React from "react";
import {SafeAreaView} from 'react-navigation';
import {
    SwitchNavigator,
    StackNavigator,
} from 'react-navigation';
import {KeyboardAvoidingView, Platform, View} from 'react-native'
import Auth from "../screens/Auth";

//для основной части приложения, той что скрыта от неавторизованного юзера выбираем навигацию типа стек
// тут могут быть и табики и левое меню и д.р
const Main = StackNavigator({
    NewsFeed:{
        screen: NewsFeed
    },
    NewsDetail:{
        screen: NewsDetail
    }
});



//switcher navigators
//позволяет переключаться между навигаторами, читай документацию
export const Navigator = SwitchNavigator(
    {
        Auth: Auth,
        Main: Main,
    },
    {
        initialRouteName: 'Auth',
    }
);


class AppNavigator extends React.PureComponent{
    render(){
        //KeyboardAvoidingView нужен для иммитации поведения клавиатуры как на адройде для иос
        const Container = Platform.OS === 'ios'? KeyboardAvoidingView : View;
        //SafeAreaView нужно для айфонов Х
        return(
            <SafeAreaView>
                <Container  style={{flex:1}} behavior="padding" enabled>
                    <Navigator/>
                </Container>
            </SafeAreaView>
        )
    }
}

export default AppNavigator;