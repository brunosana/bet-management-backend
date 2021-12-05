import React from 'react';

import {
    Container,
    NestedBets,
    Icon,
    Header,
    Info,
    CardInfo,
    Card,
    CardTitle,
    BetInfo
} from './styles';

interface IOpenedBetProps {
    teams: number;
    odds: number;
    value: number;
    return_value: number;
}

const OpenedBetCard: React.FC<IOpenedBetProps> = ({ teams, odds, value, return_value }) => {
    return (
        <Container odds={odds} > 
            <Header>
                <NestedBets>{teams} Times</NestedBets>
                <Icon name="attach-money" odds={odds} />
            </Header>
            <Info>
                <Card>
                    <CardTitle>
                        Odds
                    </CardTitle>
                    <CardInfo>
                        {odds}
                    </CardInfo>
                </Card>
                <Card>
                    <CardTitle>
                        Valor
                    </CardTitle>
                    <CardInfo>
                        R$ {value}
                    </CardInfo>
                </Card>
            </Info>
            <Info>
                <Card>
                    <CardTitle>
                        Possível retorno
                    </CardTitle>
                    <BetInfo>
                        R$ {return_value}
                    </BetInfo>
                </Card>
            </Info>
        </Container>
    );
}

export { OpenedBetCard };