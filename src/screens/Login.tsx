import { useState, useRef } from 'react';
import { View, Animated } from 'react-native';

import ScreenTemplate, { ChildrenProps as ParentProps } from '@/components/ScreenTemplate';
import Button from '@/components/Button';
import { ButtonUISettings } from '@/styles/Button';
import Input from '@/components/Input';

import { NavigateToRoute } from '@/router';
import Stores from '@/stores';

import Animations from '@/animations';
import AppTheme from '@/styles/AppTheme';
import Language from '@/language/index.json';

const { flex, padding } = ButtonUISettings;

type Props = {} & ParentProps;

const Login = (props: Props) => {
    const { User } = Stores;
    const [inputsVisible, setInputsVisible] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [role, setRole] = useState<'consultant' | 'user' | null>(null);

    const containerOpacity = useRef(new Animated.Value(1)).current;

    const handleSwitch = (isConsultant: boolean) => {
        Animations.fade(containerOpacity, 0, () => setInputsVisible(true));
        setTimeout(() => Animations.fade(
            containerOpacity,
            1,
            () => setRole(isConsultant ? 'consultant' : 'user')),
            500);
    };

    const handleLogin = () => {
        // burda authentication yapabiliriz ama sanirim kutuphaneyi kullanmak icin user token'a ihtiyac olmayacak
        if (!role) {
            console.warn('GIRIS YAPARKEN ROL ATANAMADI')
            return
        };
        User.login(name, email, role);
        NavigateToRoute('Lobby');
    }

    const compFlex = props.keyboardVisible ? flex.regular * 1.5 : flex.regular;

    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.colors.pink, alignContent: 'center' }}>
            <Animated.View style={{ flex: 0.9, justifyContent: 'center', opacity: containerOpacity }}>
                {inputsVisible ? (
                    <>
                        <View style={{ flex: compFlex, paddingHorizontal: padding.regular, marginBottom: 20 }}>
                            <Input onChange={setName} placeholder={Language.login.name} />
                        </View>
                        <View style={{ flex: compFlex, paddingHorizontal: padding.regular, marginBottom: 20 }}>
                            <Input onChange={setEmail} placeholder={Language.login.email} />
                        </View>
                        <View style={{ flex: compFlex, paddingHorizontal: padding.regular }}>
                            <Button disabled={!(name && email && role)} onPress={handleLogin} title={Language.login.login} />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={{ flex: flex.regular, paddingHorizontal: padding.regular, marginBottom: 20 }}>
                            <Button onPress={() => handleSwitch(true)} title={Language.login.consultant} />
                        </View>
                        <View style={{ flex: flex.regular, paddingHorizontal: padding.regular }}>
                            <Button onPress={() => handleSwitch(false)} title={Language.login.user} />
                        </View>
                    </>
                )}
            </Animated.View>
        </View>
    )
};

export default () => <ScreenTemplate headerType='login' children={Login} />;
