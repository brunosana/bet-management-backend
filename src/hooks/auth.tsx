import React,
{
    useContext,
    createContext,
    ReactNode,
    useState
} from 'react';

import * as Google from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthProvider{
    children: ReactNode;
}

interface IUser {
    id: string;
    email: string;
    name: string;
    photo?: string;
    locale: string;
}

interface IAuthContextData {
    user: IUser;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
}

interface IAuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

interface IUserInfo {
    id: string;
    email: string;
    name: string;
    picture: string;
    verified_email: boolean;
    locale: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider ({ children }: IAuthProvider) {
    
    const [user, setUser] = useState<IUser>({} as IUser);


    async function signInWithGoogle(){
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const REDIRECT_URL_PART = '&redirect_uri=' + process.env.REDIRECT_URI;
            const CLIENT_ID_PART = '&client_id='+ process.env.CLIENT_ID;
            const RESPONSE_TYPE_PART = '&response_type='+ RESPONSE_TYPE;
            const SCOPE_PART = '&scope=' + SCOPE;

            const authUrl =
                'https://accounts.google.com/o/oauth2/v2/auth?'
                + REDIRECT_URL_PART
                + CLIENT_ID_PART
                + RESPONSE_TYPE_PART
                + SCOPE_PART;
            const { type, params } = await Google.startAsync({ authUrl, showInRecents: false }) as IAuthorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json() as IUserInfo;

                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    locale: userInfo.locale,
                    name: userInfo.name,
                    photo: userInfo.picture
                }
                setUser(userLogged);

                await AsyncStorage.setItem('@betcontrol:user', JSON.stringify(userLogged));

            }

        }catch(error: any){
            throw new Error(error);
        }
    }

    async function signInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME
                ]
            });

            if(credential){
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    locale: '',
                    name: credential.fullName!.givenName!,
                }
                setUser(userLogged);
                await AsyncStorage.setItem('@betcontrol:user', JSON.stringify(userLogged));
            }

            
        }catch(error: any){
            throw new Error(error);
        }     
    }

    return (
    <AuthContext.Provider
        value={
            {
                user,
                signInWithGoogle,
                signInWithApple
            }
        }
      >
          { children }
      </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }
