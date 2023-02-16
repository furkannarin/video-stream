import { StyleSheet } from 'react-native';
import AppTheme from '@/styles/AppTheme';

const { colors } = AppTheme

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.translucent,
        justifyContent: 'flex-end',
        alignContent: 'center',
    }
});