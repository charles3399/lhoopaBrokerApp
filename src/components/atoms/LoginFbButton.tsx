import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import {
    colors,
    fonts
} from '_styles/globalStyles';

type Props = {
    onPress: () => void
}

export default function LoginFbButton (props: Props): React.JSX.Element {
    return (
        <TouchableOpacity {...props} style={styles.buttonStyle}>
            <Image source={require('_assets/images/icons/login/fb-icon.png')} />
            <Text
                maxFontSizeMultiplier={1.2}
                style={styles.textStyle}
            >
                Sign in with Facebook
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	buttonStyle: {
		marginTop: 10,
		backgroundColor: '#2776E0',
		padding: 10,
		width: '100%', 
		borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '20%',
        paddingRight: '20%',
        justifyContent: 'space-between'
	},
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 15, 
        fontFamily: fonts.interRegular
	}
});