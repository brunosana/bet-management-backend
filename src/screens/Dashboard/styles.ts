import styled from 'styled-components/native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import {
    Ionicons
} from '@expo/vector-icons';

import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import {
    BorderlessButton
} from 'react-native-gesture-handler'

import {
    FlatList
} from 'react-native';

import { IBetData } from './index';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(40)}px;
    background-color: ${({ theme }) => theme.colors.primary };
    align-items: flex-start;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const UserArea = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const UserPhoto = styled.Image`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;
    border-radius: ${({ theme }) => theme.patterns.radiusHard}px;
    `;

export const UserInfo = styled.View`
    margin-left: ${RFValue(15)}px;
`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(20)}px;
    `;

export const UserBets = styled.Text`
    color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Icon = styled(Ionicons)`
    color: ${({ theme }) => theme.colors.background};
    font-size: ${RFValue(28)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const ActiveBets = styled.ScrollView.attrs({ 
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 24 }
})`
width: 100%;
position: absolute;
margin-top: ${RFPercentage(20)}px;
`;

export const Bets = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(8)}px;
`;

export const BetTitle = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    margin-bottom: ${RFValue(15)}px;
`;

export const BetsList = styled(
    FlatList as new () => FlatList<IBetData>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})`
`;
