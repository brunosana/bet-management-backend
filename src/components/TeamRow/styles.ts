import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    width: 100%;
    flex-direction: row;
    background-color: ${({ theme })=> theme.colors.shape};
    padding: 8px;
    align-items: center;
    border-radius: ${({ theme })=> theme.patterns.radiusCard}px;
    margin-bottom: 10px;
`;

export const InfoArea = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text`
    width: 50%;
    color: ${({ theme })=> theme.colors.background};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;


export const Info = styled.Text`
    justify-content: flex-start;
    width: 35%;
    color: ${({ theme })=> theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.regular};
`;