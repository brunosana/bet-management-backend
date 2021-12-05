import styled from 'styled-components/native';

import {
    TouchableWithoutFeedback
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { InputForm } from '../../../components/Forms/InputForm';


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_highlight};
    align-items: center;
    justify-content: center;
`;

export const Content = styled.View`
    width: 90%;
    height: 40%;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${({ theme }) => theme.patterns.radiusHard};
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.background };
    font-family: ${ ({ theme }) => theme.fonts.bold };
    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    width: 90%;
`;

export const Input = styled(InputForm)`
    margin-top: ${RFValue(10)}px;
    background-color: ${({ theme })=> theme.colors.background};
    color: ${({ theme })=> theme.colors.shape};
`;