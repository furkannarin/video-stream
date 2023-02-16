import { StyleSheet } from 'react-native';
import AppTheme from '@/styles/AppTheme';

const { colors, borders, device } = AppTheme

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pink,
        alignContent: 'center',
    },
    animatedContainer: {
        flex: 0.9,
        justifyContent: 'center',
    },
    componentContainer: {
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: borders.width.thin,
        borderRadius: borders.radius.square,
        borderColor: colors.black,
        marginHorizontal: device.width * 0.1,
        marginVertical: device.height * 0.1
    },
    iconContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        bottom: 20,
        right: 10
    },
    icon: {
        width: 15,
        height: 15,
        tintColor: colors.black
    }
});