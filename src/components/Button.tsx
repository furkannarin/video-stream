import { useState } from 'react';
import { TouchableOpacity, Text, Image, View } from "react-native";

import Stores from '@/stores';

import AppTheme from "@/styles/AppTheme";
import Style, { MeetingStyles } from '@/styles/Button';

import Cam from '@/assets/camera.png';
import CamDisabled from '@/assets/cam.disabled.png';

import Mic from '@/assets/mic.png';
import MicDisabled from '@/assets/mic.disabled.png';

import Phone from '@/assets/phone.png';

import { leaveChannel } from "@/screens/Meeting";

type Props = {
    title?: string;
    onPress?: (...args: any[]) => any;
    theme?: "light" | "dark";
    meeting?: boolean;
    disabled?: boolean;
    timer?: string
}

const { container, icon, iconContainer, timerContainer, phoneIcon, timerText } = MeetingStyles;
const Meeting = (props: { timer: string }) => {
    const [mic, setMic] = useState(true);
    const [cam, setCam] = useState(true);

    const { Engine } = Stores;
    const engine = Engine.getEngine();

    const onPhonePressed = () => {
        if (!engine) {
            console.warn('ENGINE IS NULL');
            return;
        }

        leaveChannel(engine);
    };

    const onCamPressed = () => {
        if (!engine) {
            console.warn('ENGINE IS NULL');
            return;
        }

        engine.enableLocalVideo(!cam);
        setCam(!cam);
    };

    const onMicPressed = () => {
        if (!engine) {
            console.warn('ENGINE IS NULL');
            return;
        }

        engine.enableLocalAudio(!mic);
        setMic(!mic);
    };

    return (
        <View style={container}>
            <TouchableOpacity activeOpacity={AppTheme.defaultOpacity} onPress={onCamPressed} style={iconContainer}>
                <Image source={cam ? Cam : CamDisabled} style={icon} />
            </TouchableOpacity>
            <View style={timerContainer}>
                <TouchableOpacity activeOpacity={AppTheme.defaultOpacity} onPress={onPhonePressed} style={{ alignSelf: 'center' }}>
                    <Image source={Phone} style={phoneIcon} />
                </TouchableOpacity>
                <Text style={timerText}>{props.timer}</Text>
            </View>
            <TouchableOpacity activeOpacity={AppTheme.defaultOpacity} onPress={onMicPressed} style={iconContainer}>
                <Image source={mic ? Mic : MicDisabled} style={icon} />
            </TouchableOpacity>
        </View>
    )
};

const Button = (props: Props) => {
    const { title, onPress, meeting, disabled, timer } = props;
    const { container, titleStyle } = Style;

    return (
        meeting && timer ? <Meeting timer={timer} /> : (
            <TouchableOpacity disabled={disabled} activeOpacity={AppTheme.defaultOpacity} onPress={onPress} style={meeting ? { flex: 1 } : container}>
                <Text style={titleStyle}>{title}</Text>
            </TouchableOpacity>
        )
    )
}

export default Button;