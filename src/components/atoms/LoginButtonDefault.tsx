import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import {
    colors,
    fonts
} from '_styles/globalStyles';

type Props = {
    title: string
    onPress: () => void
    buttonStyle?: object
    disabled: boolean
}

export default function LoginButtonDefault(props: Props): React.JSX.Element {
    return (
        <TouchableOpacity
            {...props}
            style={[styles.buttonStyle, props.buttonStyle]}
        >
            <Text
                maxFontSizeMultiplier={1.2}
                style={styles.textStyle}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: colors.bluePrimary,
        padding: 10,
        width: '100%',
        borderRadius: 100
    },
    textStyle: {
        alignSelf: 'center',
        color: colors.lightPrimary,
        fontSize: 15,
        fontFamily: fonts.interRegular
    }
});