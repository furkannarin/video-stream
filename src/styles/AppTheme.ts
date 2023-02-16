import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

const AppTheme = {
    defaultOpacity: 0.6,
    device: {
        width,
        height
    },
    font: {
        size: {
            header: 22,
            subheader: 18,
            text: 14
        },
        weight: {
            bold: '800' as '800',
            regular: '400' as '400',
            light: '200' as '200'
        }
    },
    colors: {
        translucent: 'rgba(20,20,20,0.9)',
        pink: '#abaaf8',
        purple: '#4419bf',
        white: '#ffffff',
        black: '#000000',
        red: '#cd1415',
        gray: "#292929"
    },
    borders: {
        width: {
            thin: 0.8,
            regular: 1.5,
            thick: 2
        },
        radius: {
            circle: 100,
            smooth: 10,
            square: 3
        }
    }
};

export default AppTheme;
