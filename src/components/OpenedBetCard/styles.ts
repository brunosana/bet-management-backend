import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';

interface ICard {
    odds: number;
}

export const Container = styled.View<ICard>`
    width: ${RFValue(300)}px;
    height: ${RFValue(175)}px;
    border-radius: ${({ theme }) => theme.patterns.radiusCard}px;
    background-color: ${ ({ theme, odds }) =>
        odds >= 2 ? theme.colors.shape_highlight
        : theme.colors.shape
    };
    padding: 19px 18px;
    margin-right: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Info = styled.View`
    flex-direction: row;
`;

export const Card = styled.View`
    margin-right: ${ RFValue(25) }px;
`;

export const CardTitle = styled.Text`
    margin-bottom: ${RFValue(-6)}px;
    font-size: ${ RFValue(12) }px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.title};
    opacity: 0.5;
`;

export const CardInfo = styled.Text`
    font-size: ${ RFValue(24) }px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.background};
    margin-bottom: ${RFValue(6)}px;
`;

export const BetInfo = styled.Text`
    font-size: ${ RFValue(28) }px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title};
`;

export const NestedBets = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.background};
    `;

export const Icon = styled(MaterialIcons)<ICard>`
    color: ${ ({ theme, odds }) =>
        odds >= 2 ? theme.colors.shape
        : theme.colors.success
    };
    font-size: ${RFValue(40)}px;
`;