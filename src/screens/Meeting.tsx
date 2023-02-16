import { useState, useEffect } from 'react';
import { View, BackHandler, Platform } from 'react-native';
import { ClientRoleType, ChannelProfileType, RtcSurfaceView, IRtcEngine } from 'react-native-agora';

import ScreenTemplate, { ChildrenProps as ParentProps } from '@/components/ScreenTemplate';
import Button from '@/components/Button';
import { ButtonUISettings } from '@/styles/Button';

import { NavigateToRoute } from '@/router';
import Stores from '@/stores';

import Style from './styles/Meeting';
import AppTheme from '@/styles/AppTheme';

const { flex, padding } = ButtonUISettings;
const { container } = Style;

type Props = {} & ParentProps;

type AgoraConnection = {
    channelId: string;
    localUid: number;
};

let TIMER_ID: number | null = null;

export const leaveChannel = (engine: IRtcEngine) => {
    try {
        engine.leaveChannel(); // butun ayarlar default olarak istedigim gibi oldugu icin parametre yollamadim
        console.log('LEFT THE CHANNEL');
        NavigateToRoute('Lobby');
    } catch (err) {
        console.warn('ERROR WHEN LEAVING CHANNEL');
        console.log(err);
    }

    return true;
};

const Meeting = (props: Props) => {
    const { User, Engine } = Stores;

    const engine = Engine.getEngine();
    const userInfo = User.getUserInfo();
    const call_duration = userInfo.call_duration;
    const callStatus = Engine.getCallStatus();
    const channelInfo = Engine.getChannelInfo();

    const [remote_user_uid, setRemoteUid] = useState<number | null>(null);

    // prod'da bu surelerin, psikolog'in User store'una API'dan gelmesi gerekir muhtemelen, ancak, test-case icin bu sekilde implement ettim
    const [minutes, setMinutes] = useState(call_duration.minutes);
    const [seconds, setSeconds] = useState(call_duration.seconds);
    const [timer, setTimer] = useState(0); // 0: not started or stopped, 1: local or remote user joined, 2: both users are available

    if (!engine) {
        // case projesi oldugu icin ve bu case'in gerceklesmeyecegini bilmenin rahatligiyla bu sekilde "biraktim"
        console.warn('ENGINE COULD NOT BE INITIALIZED');
        return;
    }

    if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', () => leaveChannel(engine));
    }

    // set the status of the call to true in the store
    if (timer === 2 && !callStatus) Engine.setCallStarted(true);

    useEffect(() => {
        if (timer > 1 && minutes === 0 && seconds === 0) {
            return () => {
                leaveChannel(engine);
                Engine.setCallStarted(false);
            }
        }
    }, [seconds === 0]);

    if (timer > 1) {
        if (minutes > -1 && seconds > -1) {
            TIMER_ID && clearTimeout(TIMER_ID);
            TIMER_ID = setTimeout(() => {
                if (seconds - 1 === -1) {
                    setMinutes(minutes - 1 === -1 ? 59 : minutes - 1);
                    setSeconds(59);
                    return;
                }
                setSeconds(seconds - 1)
            }, 1000);
        }
    }

    // onUserOffline callback'i ile, "timer - 1" yaptigimizda sureyi durdurmus oluruz. ancak, gorusmeden ciktiktan sonraki flow belli olmadigi icin implement etmedim
    const stopTimer = () => { };

    const handleLocalUserJoin = () => {
        console.log('JOINED THE CHANNEL SUCCESSFULLY');
        setTimer(p => p + 1);
    };

    const handleRemoteUserJoin = (connection: AgoraConnection, uid: number) => {
        console.log('REMOTE USER JOINED: ', connection)
        console.log('REMOTE USER UID: ', uid)

        setRemoteUid(uid);
        setTimer(p => p + 1);
    };

    useEffect(() => {
        try {
            if (engine) {
                engine.registerEventHandler({
                    onJoinChannelSuccess: handleLocalUserJoin,
                    onUserJoined: handleRemoteUserJoin
                });

                engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
                engine.joinChannel(
                    channelInfo.token,
                    channelInfo.channel_name,
                    0, // agora generates a random id for each user if set to 0
                    { clientRoleType: ClientRoleType.ClientRoleBroadcaster }
                );
            }
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <View style={container}>
            <RtcSurfaceView style={{ flex: 1 }} canvas={{ uid: timer > 1 ? remote_user_uid as number : 0 }} connection={{ channelId: channelInfo.channel_name }} />
            {timer < 2 && <View style={{ position: 'absolute', width: AppTheme.device.width, height: AppTheme.device.height, backgroundColor: AppTheme.colors.translucent }} />}
            <View style={{ flex: flex.meeting, paddingHorizontal: padding.meeting, marginBottom: 20, zIndex: 100 }}>
                <Button meeting timer={`${minutes}:${seconds}`} />
            </View>
        </View>
    )
};

export default () => <ScreenTemplate headerType='meeting' children={Meeting} />;
