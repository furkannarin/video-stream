import { StyleSheet } from 'react-native';
import AppTheme from '../AppTheme';

export const getColor = (type: "login" | "meeting" | "lobby") => {
    if (type === 'login') return AppTheme.colors.pink;
    if (type === 'meeting') return AppTheme.colors.translucent;
    if (type === 'lobby') return AppTheme.colors.white;
    return AppTheme.colors.white;
}

const { colors, font, borders } = AppTheme;

export default StyleSheet.create({
    icon: {
        width: 100,
        height: 50,
        alignSelf: 'center'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: borders.radius.circle,
        alignSelf: 'center',
        marginHorizontal: 20
    },
    detailContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        color: colors.black,
        fontSize: font.size.subheader,
        fontWeight: font.weight.bold
    },
    occupation: {
        fontSize: font.size.text,
        fontWeight: font.weight.regular
    },
    meetingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    backIcon: {
        width: 30,
        height: 30,
        left: 10,
        tintColor: colors.white
    },
    meetingHeader: {
        flex: 1,
        letterSpacing: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.white,
        fontSize: font.size.subheader,
        fontWeight: font.weight.regular
    },

});
