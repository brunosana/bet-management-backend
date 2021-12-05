import React from 'react';
import { Alert } from 'react-native';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    FooterWrapper,
    Footer
} from './styles';

import AppleSvg from '../../shared/assets/apple.svg';
import GoogleSvg from '../../shared/assets/google.svg';
import Logo from '../../shared/assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

const SignIn: React.FC = () => {

    const { signInWithGoogle } = useAuth();

    async function handleSignInWithGoogle(){
        try {
            await signInWithGoogle();
        }catch(error){
            console.log(error);
            Alert.alert('Erro ao logar com Google');
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Logo
                        width={RFValue(130)}
                        height={RFValue(130)}
                    />
                    <Title>
                        Gerencie e observe as suas apostas
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça o seu login
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>
        </Container>        
    );
}

export { SignIn };

