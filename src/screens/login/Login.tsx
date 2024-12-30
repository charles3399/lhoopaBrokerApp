import {
    useState,
    useEffect,
} from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Platform
} from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import _ from 'lodash';

import { colors, fonts } from '_styles/globalStyles';

import LhoopaLogo from '_components/atoms/LhoopaLogo';
import LoginInput from '_components/atoms/LoginInput';
import LoginButtonDefault from '_components/atoms/LoginButtonDefault';
import LoginFbButton from '_components/atoms/LoginFbButton';
import LoginAppleButton from '_components/atoms/LoginAppleButton';

import { login } from '_actions/authActions';
import useAuthStore from '_reducers/authReducer';

type StringOrNull = string | null;

export default function Login(props: any): React.JSX.Element {
    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState<boolean>(false);
    const [form, setForm] = useState<{
        username: StringOrNull,
        password: StringOrNull
    }>({
        username: null,
        password: null
    })
    const [socialId, setSocialId] = useState<StringOrNull>(null);
    const [socialToken, setSocialToken] = useState<StringOrNull>(null);
    const [firstName, setFirstName] = useState<StringOrNull>(null);
    const [lastName, setLastName] = useState<StringOrNull>(null);
    const [name, setName] = useState<StringOrNull>(null);
    const [email, setEmail] = useState<StringOrNull>(null);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { user, updateUser, logout } = useAuthStore();

    useEffect(() => {
        let initRoute = "";

        if ( props?.error?.login && props?.error?.errorCode != "004" ) {
            if (!show) {
                setTitle("Error");
                setMessage(props.error.login);
                setShow(true);
            }
        }

        if ( props?.error?.login && props?.error?.errorCode == "004" ) {
            if ( isLoginLoading ) {
                setIsLoginLoading(false);
            }
        }

        if (props?.auth?.loggedIn) {
            if (!_.isEmpty( props?.auth?.incomplete_user_info )) {
                initRoute = 'ProfileIncompleteDetails'
            } else if( props?.auth?.user?.role_id != '316' && props?.auth?.user?.role_slug == "agent" && props?.auth?.user?.social_id && props?.auth?.user?.parent_id == '0' ) {
                initRoute = 'ProfileFbLoginSetup';
            } else if( props?.auth?.user?.role_slug == "agent" && props?.auth?.user?.social_id && props?.auth?.user?.parent_id && props?.auth?.user?.active == '0' ) {
                initRoute = 'ProfileFbLoginSetupSuccessPage';
            } else {
                initRoute = 'Tabs'
            }

            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: initRoute },
                    ],
                })
            );
        }
    }, []);

    const onChangeText = (value: {[key: string]: string}) => {
        let _form = Object.assign({}, form, value);

        let _isLoginButtonDisabled = false
    
        setTimeout(() => {
            if ( _form.username && _form.password ) {
                _isLoginButtonDisabled = false;
            } else {
                _isLoginButtonDisabled = true;
            }

            setForm(_form);
            setIsLoginButtonDisabled(_isLoginButtonDisabled);
        }, 50);
    };

    const _onLogin = async () => {
        // logout();
        // console.log('user', user);
        if (isLoginButtonDisabled) return;

        setIsLoginLoading(true);
        
        try {
            await login(form.username, form.password);
        } catch (error) {
            console.log('Errorz', error);
        } finally {
            setIsLoginLoading(false);
        }
    };

    const getPublicProfile = async () => {
        const infoRequest = new GraphRequest(
            '/me?fields=id,name,picture,first_name,last_name,gender,birthday,email',
            undefined,
            (error: any, result: any) => {
                if (error) {
                    console.log('Error fetching data: ' + error.toString());
                } else {
                    setFirstName(result.first_name);
                    setLastName(result.last_name);
                    setName(result.name);
                    setSocialId(result.id);

                    _onLoginFb()
                }
            }
        );

        new GraphRequestManager().addRequest(infoRequest).start();
    }

    const _onLoginFb = () => {
        setIsLoginLoading(true);
        props.onLoginFb({
            socialId,
            socialToken,
            firstName,
            lastName,
            name,
            email,
            title,
            message,
            show,
            showPassword,
        })
    };

    const onPressLoginFb = () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            (result) => {
                if (result.isCancelled) {
                    console.log("Login Cancelled " + JSON.stringify(result))
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data: any) => {
                            console.log(data.accessToken.toString(), 'test1')
                            setSocialToken(data.accessToke.toString());
                            getPublicProfile();
                        }
                    )
                }
            },
            (error) => {
                console.log("Login failed with error: " + error);
            }
        )
    }

    const onAppleButtonPress = async () => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated

            setFirstName(appleAuthRequestResponse?.fullName?.familyName || null);
            setLastName(appleAuthRequestResponse?.fullName?.givenName || null);
            setName(appleAuthRequestResponse?.fullName?.givenName + " " + appleAuthRequestResponse?.fullName?.familyName);
            setSocialId(appleAuthRequestResponse.user);
            setSocialToken(appleAuthRequestResponse.user);
            setEmail(appleAuthRequestResponse.email);

            _onLoginFb()
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.parent}>
                <Image
                    source={ require('_assets/images/rebrand/login-bg-top.png') }
                    style={styles.loginBgTop}
                />
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <LhoopaLogo />

                        <View style={styles.appTag}>
                            <Text style={styles.appLabel}>Broker's App</Text>
                        </View>

                        {
                            isLoginLoading ? (
                                <ActivityIndicator size="large" color={ colors.redPrimary } />
                            ) : (
                                <View style={styles.container2}>
                                    <LoginInput
                                        placeholder={'Username'}
                                        onChangeText={(value) => onChangeText({username: value})}
                                        placeholderTextColor="#7f7f7f"
                                    />
                                    <LoginInput
                                        placeholder={'Password'}
                                        secureTextEntry={!showPassword}
                                        icon={!showPassword ? "eye" : "eye-slash"}
                                        onChangeText={(value) => onChangeText({password: value})}
                                        placeholderTextColor="#7f7f7f"
                                        showPassword={() => setShowPassword(!showPassword)}
                                    />
                                    <LoginButtonDefault
                                        title={'Login'}
                                        onPress={_onLogin}
                                        disabled={isLoginButtonDisabled}
                                    ></LoginButtonDefault>

                                    <LoginFbButton onPress={onPressLoginFb} />

                                    {
                                        Platform.OS === 'ios' ? (
                                            <LoginAppleButton onPress={onAppleButtonPress} />
                                        ) : null
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>
                <Image
                    source={ require('_assets/images/rebrand/login-bg-bottom.png') }
                    style={styles.loginBgBottom}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parent: {
        height: '100%',
        backgroundColor: '#fff',
    },
    loginBgTop: {
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    loginBgBottom: {
        resizeMode: 'cover',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: 'transparent'
    },
    container:{
        width: '80%',
        alignItems: "center",
        justifyContent:"center",
    },
    container2:{
        width: '100%',
        alignItems: "center",
        justifyContent:"center",
    },
    appTag: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    appLabel: {
        marginLeft: 10,
        color: colors.darkPrimary,
        fontSize: 17,
        fontFamily: fonts.ralewayBold
    }
})