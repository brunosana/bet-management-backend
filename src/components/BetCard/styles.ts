import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

interface IGain {
    gain: boolean;
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    padding: 10px 18px;
    border-radius: ${({ theme }) => theme.patterns.radiusCard}px;
    margin-bottom: ${RFValue(12)}px;
`;

export const Info = styled.Text`
    font-family: ${({ theme }) => theme.fonts.light};
`;

export const Value = styled.Text<IGain>`
    font-size: ${RFValue(22)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme, gain }) => gain ? theme.colors.success:theme.colors.attention};
`;

export const Header =styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderInfo = styled.View`
`;

export const HeaderIcon = styled(AntDesign)<IGain>`
    color: ${({ theme, gain }) => gain ? theme.colors.success:theme.colors.attention};
    font-size: ${RFValue(20)}px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const FooterInfo = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({ theme }) => theme.fonts.light};
`;