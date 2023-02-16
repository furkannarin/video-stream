import React, { useState } from 'react';
import { SafeAreaView, View, Keyboard } from 'react-native';
import Header from './Header';

type Props = {
    children?: any;
    headerType?: 'meeting' | 'login' | 'lobby';
}

export type ChildrenProps = {
    keyboardVisible?: boolean
}

const ScreenTemplate = (props: Props) => {
    const { headerType, children } = props;
    const [containerFlex, setFlex] = useState(10);

    Keyboard.addListener('keyboardDidShow', () => setFlex(12));
    Keyboard.addListener('keyboardDidHide', () => setFlex(10));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {headerType && <Header shrinkHeader={Number((containerFlex * 0.1).toPrecision(2))} type={headerType} />}
            <View style={{ flex: containerFlex }}>
                {children({ keyboardVisible: containerFlex !== 10 })}
            </View>
        </SafeAreaView>
    );
}

export default ScreenTemplate;
