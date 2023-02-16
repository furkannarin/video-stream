import React from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';

import Style, { getColor } from '@/styles/Header';

import Logo from '@/assets/logo.png';
import Back from '@/assets/back.png';
import AppTheme from '@/styles/AppTheme';

import Language from '@/language/index.json';

import Stores from '@/stores';

import { leaveChannel } from '@/screens/Meeting';

type Props = {
    type: "login" | "meeting" | "lobby";
    shrinkHeader?: number;
};

type HeaderProps = {
    userInfo: Record<string, unknown>;
}

const { icon, infoContainer, avatar, detailContainer, name, occupation, backIcon, meetingContainer, meetingHeader } = Style;
const { consultant, user } = Language;

const Login = () =>
    <React.Fragment>
        <StatusBar backgroundColor={AppTheme.colors.pink} />
        <Image source={Logo} style={icon} />
    </React.Fragment>

const Info = (props: HeaderProps) =>
    <View style={infoContainer}>
        <StatusBar backgroundColor={AppTheme.colors.white} />
        <Image source={Logo} style={avatar} />
        <View style={detailContainer}>
            <Text style={name}>{`${consultant.greetingMsg}${props.userInfo.name}`}</Text>
            {props.userInfo.role === 'consultant' && <Text style={occupation}>Psikolog</Text>}
        </View>
    </View>

const Meeting = (props: HeaderProps) => {
    const { User, Engine } = Stores;
    const userRole = User.getUserInfo().role;
    const engine = Engine.getEngine();

    return (
        <View style={meetingContainer}>
            <StatusBar backgroundColor={AppTheme.colors.translucent} />
            <TouchableOpacity activeOpacity={AppTheme.defaultOpacity} onPress={() => engine && leaveChannel(engine)} style={{ alignSelf: 'center' }}>
                <Image source={Back} style={backIcon} />
            </TouchableOpacity>
            <Text style={meetingHeader}>{userRole === 'consultant' ? consultant.meeting : user.meeting}</Text>
        </View>
    )
}

const Header = (props: Props) => {
    const { type, shrinkHeader } = props;

    const { User, Engine } = Stores;
    const userInfo = User.getUserInfo();
    const callStatus = Engine.getCallStatus();

    if (type === 'meeting') return (
        !callStatus ?
            <View style={{ flex: shrinkHeader ? shrinkHeader : 1, backgroundColor: getColor(type), zIndex: 100 }}>
                {type === 'meeting' && <Meeting userInfo={userInfo} />}
            </View> : <View />
    )

    return (
        <View style={{ flex: shrinkHeader ? shrinkHeader : 1, backgroundColor: getColor(type) }}>
            {type === 'login' && <Login />}
            {type === 'lobby' && <Info userInfo={userInfo} />}
        </View>
    );
}

export default Header;
