import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { IOption } from '../../shared/interfaces/IOption';

import {
    Container,
    Info,
    Title,
    InfoArea
} from './styles';

interface ITeam extends RectButtonProps{
    team: string;
    option: IOption;
    odds: number;
}

const TeamRow: React.FC<ITeam> = ({ team, odds, option, ...rest }) => {
    return (
        <Container
            {...rest}
        >
            <Title>{team}</Title>
            <InfoArea>
                <Info>{option.name}</Info>
                <Info>Odds {odds}</Info>
            </InfoArea>
        </Container>
    );
}

export { TeamRow };