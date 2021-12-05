import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    height: ${RFValue(90)};
    align-items: center;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    padding-bottom: ${RFValue(20)};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;
    justify-content:space-between;
`;

export const FormMiddle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Bets = styled.ScrollView`
    flex: 1;
    margin: 20px 0;
    width: 100%;
`;

export const Fields = styled.View``;