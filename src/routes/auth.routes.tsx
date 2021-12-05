import React from 'react';

import { 
    createStackNavigator
} from '@react-navigation/stack';

import { SignIn } from '../screens/Signin';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />
        </Navigator>
    );
}

export { AuthRoutes };