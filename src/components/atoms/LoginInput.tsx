import {
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { fonts } from '_styles/globalStyles';

const Icons = FontAwesome5Icon as any;

type Props = {
    placeholder: 'Username' | 'Password'
    secureTextEntry?: boolean
    showPassword?: () => void
    onChangeText: (value: string) => void
    icon?: "eye" | "eye-slash"
    placeholderTextColor?: string
}

export default function LoginInput(props: Props): React.JSX.Element {
	return (
		<View style={styles.container}>
            <TextInput
                {...props}
                keyboardType={"default"}
                style={[styles.inputStyle, Platform.OS == "ios" ? { height: 50 } : {}]}
            />
			{
				props.placeholder == "Password" ? (
					<TouchableOpacity
						style={styles.button}
						onPress={props.showPassword}
					>
                        <Icons
                            name={props.icon}
                            size={18}
                        />
					</TouchableOpacity>
				) : null
			}
		</View>
	)
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row'
    },
    inputStyle: {
		backgroundColor: '#EDEEF2',
		borderRadius: 8,
		paddingLeft: 20,
		fontFamily: fonts.interRegular,
		color: '#404040',
		width: '100%',
		height: 50
    },
    button: {
        position: 'absolute',
        right: 20,
        top: 17
    }
});