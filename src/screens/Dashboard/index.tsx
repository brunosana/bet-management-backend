import React, { useState } from 'react';
import { 
    Container,
    Header,
    UserInfo,
    UserArea,
    UserName,
    UserPhoto,
    UserBets,
    UserWrapper,
    Icon,
    ActiveBets,
    Bets,
    BetTitle,
    BetsList,
    LogoutButton
} from './styles';

import { OpenedBetCard } from '../../components/OpenedBetCard';


import { BetCard, IBetCardData } from '../../components/BetCard';

interface IBetData extends IBetCardData{
    id: number;
}

const Dashboard: React.FC = () => {

    const [bets, setBets] = useState<Array<IBetData> | []>([
        {
            id: 1,
            teams: 8,
            odds: 1.11,
            gain: true,
            date: new Date(),
            value: 40.0
        },
        {
            id: 2,
            teams: 3,
            odds: 1.25,
            gain: false,
            date: new Date(),
            value: 75.40
        },
        {
            id: 3,
            teams: 3,
            odds: 2.13,
            gain: true,
            date: new Date(),
            value: 250.00
        },
        {
            id: 4,
            teams: 8,
            odds: 1.11,
            gain: true,
            date: new Date(),
            value: 40.0
        },
        {
            id: 5,
            teams: 3,
            odds: 1.25,
            gain: false,
            date: new Date(),
            value: 75.40
        },
        {
            id: 6,
            teams: 3,
            odds: 2.13,
            gain: true,
            date: new Date(),
            value: 250.00
        },
    ]);

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserArea>
                        <UserPhoto source={{ uri: 'https://github.com/brunosana.png' }} />
                        <UserInfo>
                            <UserName>BrunoSana</UserName>
                            <UserBets>90 Apostas</UserBets>
                        </UserInfo>
                    </UserArea>
                    <LogoutButton
                        onPress={() => {}}
                    >
                        <Icon name="md-exit-outline"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <ActiveBets>
                <OpenedBetCard teams={8} odds={1.11} value={30.00} return_value={150.65} />
                <OpenedBetCard teams={2} odds={1.6} value={45.00} return_value={215.00} />
                <OpenedBetCard teams={3} odds={2.4} value={180.00} return_value={550.65} />
                <OpenedBetCard teams={8} odds={1.11} value={30.00} return_value={150.65} />
            </ActiveBets>
            <Bets>
                <BetTitle>Histórico</BetTitle>
                <BetsList
                    data={bets}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <BetCard data={item} />}
                />
            </Bets>
        </Container>
    );
};

export { Dashboard, IBetData }