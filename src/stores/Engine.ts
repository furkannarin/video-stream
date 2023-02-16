import { PermissionsAndroid, Platform } from 'react-native';
import { createAgoraRtcEngine, IRtcEngine, ChannelProfileType } from 'react-native-agora';

import { makeObservable, observable, action } from 'mobx';

import EngineDocs from '@/language/engine.json';

type ErrorCode = -1 | -2 | -7 | -22 | -101;

const EngineErrorMapper = (code: ErrorCode): string => {
    console.warn(EngineDocs.errors[code]);
    return EngineDocs.errors[code];
}

class Engine {
    private appId: string = '7a221e9e521247f2b659d257c5656607';
    // !! BU TOKEN 15 SUBAT 16:52'YE DEK GECERLI !!
    private token: string = '007eJxTYAi8K75tjXNW63rTt1w8xyceauuVT7WZfXFF8I1o7lvXih8pMJiYpqYkGZiYmphbpJkYJFpaGKQapRmbphonGqekpSQaKyx4ndwQyMjQtDiamZEBAkF8IYaS1KLEgoLMPN2S1OIS3eTE4lQGBgB8qyXr'
    private channel_name: string = 'terappin-test-case';

    @observable private engine: IRtcEngine | null = null;
    @observable private remote_uid: string[] = [];
    @observable private isInitialized = false;
    @observable private callStarted = false;

    @observable protected error: string | null = null;

    constructor() {
        makeObservable(this);
    }

    @action async initialize() {
        try {
            if (Platform.OS === 'android') await this.getPermissionsForAndroid();
            if (!this.isInitialized) {
                // kullanicinin izin vermedigi senaryoda, toaster gosterdikten sonra,
                // fonksiyonaliteyi "isInitialized" field'ini kullanarak component seviyesinde disable edebiliriz
                console.warn('KAMERA VE SES IZNI VERILMEDI! ENGINE BASLATILAMADI!')
                return;
            }

            this.engine = createAgoraRtcEngine();
            const result = this.engine.initialize({ appId: this.appId, channelProfile: ChannelProfileType.ChannelProfileCommunication });

            if (result > -1) return;

            this.error = EngineErrorMapper(result as ErrorCode);
        } catch (e) {
            // hatayi try kisminda handle ettigimiz icin burayi bos birakabiliriz
        }
    }

    getEngine() {
        return this.engine;
    }

    getChannelInfo() {
        return { token: this.token, channel_name: this.channel_name };
    }

    @action private async getPermissionsForAndroid() {
        try {
            const result = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);

            const permissionGranted = Object.values(result).filter(p => p !== "granted").length === 0;
            this.isInitialized = permissionGranted;
        } catch (err) {
            this.isInitialized = false;
            console.warn(err);
        }
    }

    getRemoteUid() {
        return this.remote_uid;
    }

    @action setRemoteUid(id: string) {
        this.remote_uid = [...this.remote_uid, id];
    }

    getCallStatus() {
        return this.callStarted;
    }

    @action setCallStarted(status: boolean) {
        this.callStarted = status;
    }
}

export default Engine;