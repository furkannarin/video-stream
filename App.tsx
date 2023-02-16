import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { IRtcEngine } from 'react-native-agora';

import { useState } from 'react';
import { observer } from 'mobx-react';

import Router from '@/router';
import Stores from '@/stores';

const App = () => {
    const { Engine } = Stores;
    const [engine, setEngine] = useState<IRtcEngine | null>(null);

    const init = async () => {
        await Engine.initialize();
        const engineInstance = Engine.getEngine();
        if (!engineInstance) {
            console.warn('ENGINE BASLATILAMADI!');
            return;
        }

        engineInstance.enableVideo();
        engineInstance.enableAudio();
        setEngine(engineInstance);
    };

    if (!engine) init();

    return (
        <NavigationContainer>
            <Router />
        </NavigationContainer>
    )
}

export default observer(App);
