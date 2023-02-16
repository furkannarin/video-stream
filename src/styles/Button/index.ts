import { StyleSheet } from 'react-native';
import AppTheme from '../AppTheme';

const { colors, borders, device, font } = AppTheme

export const ButtonUISettings = {
    flex: {
        regular: 0.1,
        meeting: 0.15
    },
    padding: {
        regular: device.width * 0.1,
        meeting: device.width * 0.05
    }
}

export const MeetingStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: colors.translucent,
        borderRadius: borders.radius.circle
    },
    timerContainer: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        backgroundColor: colors.red,
        borderRadius: borders.radius.circle
    },
    iconContainer: {
        flex: 0.1,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    icon: {
        tintColor: colors.white,
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    phoneIcon: {
        tintColor: colors.white,
        height: 50,
        width: 50,
        alignSelf: 'center',
        transform: [{ rotateZ: '270deg' }] // bunun yerine, png dosyasini da cevirebiliriz aslinda. daha optimize olur ayrica :D
    },
    timerText: {
        fontSize: font.size.text,
        fontWeight: font.weight.bold,
        letterSpacing: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.white
    }
});

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.purple,
        borderRadius: borders.radius.circle
    },
    titleStyle: {
        flex: 1,
        fontSize: font.size.subheader,
        fontWeight: font.weight.regular,
        letterSpacing: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.white
    },
});
