import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import {
    TouchableOpacity
 } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(TouchableOpacity)`
    width: 100%;
    padding: 18px;
    align-items: center;
    background-color: ${({theme})=> theme.colors.primary};
    border-radius: ${({theme}) => theme.patterns.radiusCard}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme})=> theme.colors.background};
`;