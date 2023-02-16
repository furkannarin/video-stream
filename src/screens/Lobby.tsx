import { useState, useRef } from 'react';
import { View, Animated, Image } from 'react-native';

import ScreenTemplate, { ChildrenProps as ParentProps } from '@/components/ScreenTemplate';
import Button from '@/components/Button';
import { ButtonUISettings } from '@/styles/Button';
import Input from '@/components/Input';

import { NavigateToRoute } from '@/router';

import Style from './styles/Lobby';
import Animations from '@/animations';
import Language from '@/language/index.json';

import Cancel from '@/assets/cancel.png';

const { flex, padding } = ButtonUISettings;
const { container, animatedContainer, componentContainer, iconContainer, icon } = Style;

type Props = {} & ParentProps;

const Lobby = (props: Props) => {
    const { keyboardVisible } = props;
    const [inputsVisible, setInputsVisible] = useState(false);
    const [connectionId, setConnectionId] = useState<string | null>(null);

    const containerOpacity = useRef(new Animated.Value(1)).current;

    const handleSwitch = () => {
        Animations.fade(containerOpacity, 0, () => setInputsVisible(true));
        setTimeout(() => Animations.fade(containerOpacity, 1), 500);
    };

    const compFlex = keyboardVisible ? flex.regular * 4.5 : flex.regular * 3;
    const compContFlex = keyboardVisible ? 0.65 : 0.5;

    return (
        <View style={container}>
            <Animated.View style={{ ...animatedContainer, opacity: containerOpacity }}>
                {inputsVisible ? (
                    <View style={{ ...componentContainer, flex: compContFlex }}>
                        <View style={{ ...iconContainer, flex: compFlex * 0.1, top: keyboardVisible ? 10 : undefined }}>
                            <Image source={Cancel} style={icon} />
                        </View>
                        <View style={{ flex: compFlex, paddingHorizontal: padding.regular, marginBottom: 20 }}>
                            <Input onChange={setConnectionId} placeholder={Language.lobby.connectionId} hasBorder />
                        </View>
                        <View style={{ flex: compFlex, paddingHorizontal: padding.regular }}>
                            <Button disabled={!Boolean(connectionId)} onPress={() => NavigateToRoute('Meeting')} title={Language.lobby.connect} />
                        </View>
                    </View>
                ) : (
                    <>
                        <View style={{ flex: flex.regular, paddingHorizontal: padding.regular, marginBottom: 20 }}>
                            <Button onPress={handleSwitch} title={Language.lobby.join} />
                        </View>
                    </>
                )}
            </Animated.View>
        </View>
    )
};

export default () => <ScreenTemplate headerType='lobby' children={Lobby} />;
