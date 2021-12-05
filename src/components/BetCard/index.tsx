import React from 'react';

import {
    Container,
    Info,
    Value,
    Footer,
    FooterInfo,
    Header,
    HeaderInfo,
    HeaderIcon
} from './styles';

interface IBetCardData{
    gain: boolean;
    teams: number;
    value: number;
    odds: number;
    date:Date;
}

interface IBetInfo {
    data: IBetCardData;
}

const BetCard: React.FC<IBetInfo> = ({ data }) => {
    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <Info>{ data.teams } Casadinhas</Info>
                    <Value gain={data.gain}>R$
                        {`${!data.gain ? ' -' : '  '}`}
                        {data.value.toFixed(2).toString().replace('.',',')}
                    </Value>
                </HeaderInfo>
                <HeaderIcon gain={data.gain} name={`${data.gain ? "arrowup" : "arrowdown"}`}/>
            </Header>
            <Footer>
                <FooterInfo>Odds: {data.odds}</FooterInfo>
                <FooterInfo>{data.date.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</FooterInfo>
            </Footer>
        </Container>
    );
}

export { BetCard, IBetCardData }