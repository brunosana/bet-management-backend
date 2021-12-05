import styled from 'styled-components/native';

import {
    Feather
} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 48.5%;
    padding: 19px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.patterns.radiusCard}px;
    margin-bottom: 8px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.background};
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    `;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.background};
`;