import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { fonts } from '_styles/globalStyles';

type Props = {
    onPress: () => {}
}

export default function LoginAppleButton(props: Props): React.JSX.Element {
    return (
        <TouchableOpacity
            {...props}
            style={styles.buttonStyle}
        >
            <Image source={require('_assets/images/icons/login/apple-icon.png')}></Image>
            <Text
                maxFontSizeMultiplier={1.2}
                style={styles.textStyle}
            >
                Sign in with Apple
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	buttonStyle: {
        marginTop: 10,
		backgroundColor: '#000000',
		padding: 10,
		width: '100%', 
		borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '25%',
        paddingRight: '25%',
        justifyContent: 'space-between'
	},
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 15, 
        fontFamily: fonts.interRegular
	}
});