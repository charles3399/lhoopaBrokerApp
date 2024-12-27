import {
    View,
    Image,
    StyleSheet,
    Platform
} from 'react-native';

export default function LhoopaLogo(): React.JSX.Element {
    return (
        <Image
            source={require('_assets/images/rebrand/lhoopa-logo.png')}
            style={styles.logoStyle}
        />
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        marginTop: -100,
        width: '80%',
        height: Platform.OS == "ios" ? '20%':'25%',
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});
