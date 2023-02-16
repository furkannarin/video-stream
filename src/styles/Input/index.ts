import { StyleSheet } from 'react-native';
import AppTheme from '../AppTheme';

const { colors, borders, font } = AppTheme

export default (hasBorder?: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borders.radius.circle,
        justifyContent: 'center',
        borderWidth: hasBorder ? 1 : 0
    },
    text: {
        flex: 1,
        fontSize: hasBorder ? font.size.text : font.size.subheader,
        fontWeight: hasBorder ? font.weight.bold : font.weight.regular,
        letterSpacing: hasBorder ? 0 : 1,
        marginLeft: hasBorder ? 0 : 20,
        textAlign: hasBorder ? 'center' : 'left',
        textAlignVertical: 'center',
        color: hasBorder ? colors.black : colors.purple
    },
});