import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard  } from '../screens/Dashboard';
import { CreateBet  } from '../screens/CreateBet';
import { Platform } from 'react-native';


const AppRoutes: React.FC = () => {

    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.shape,
                tabBarLabelPosition: 'beside-icon',
                tabBarActiveBackgroundColor: theme.colors.background_highlight,
                tabBarInactiveBackgroundColor: theme.colors.background,
                tabBarStyle: {
                    height: 50,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <AntDesign
                            name="setting"
                            size={size}
                            color={color}
                        />
                    )
                }}
                />
            <Screen
                name="New Bet"
                component={CreateBet}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <AntDesign
                            name="pluscircleo"
                            size={size}
                            color={color}
                        />
                    )
                }}
                />
            <Screen
                name="Analytics"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <AntDesign
                            name="linechart"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
}

export { AppRoutes }