import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import {
    FlatList
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { IOption } from '../../../shared/interfaces/IOption';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    height: ${RFValue(90)}px;
    align-items: center;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    padding-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const List = styled(
    FlatList as new () => FlatList<IOption>
)`
    flex: 1;
    width: 100%;
`;

export const Category = styled.TouchableOpacity`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.shape};
    `;

export const Icon = styled(AntDesign)`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(14)}px;
    margin-right: ${RFValue(10)}px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.shape};
`;