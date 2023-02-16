import { StackNavigationOptions } from '@react-navigation/stack';

import Login from '@/screens/Login';
import Lobby from '@/screens/Lobby';
import Meeting from '@/screens/Meeting';

type Route = {
    component: any,
    options?: StackNavigationOptions
}

export const INITIAL_ROUTE = 'Login';

export const Routes: Record<string, Route> = {
    Login: { component: Login },
    Lobby: { component: Lobby },
    Meeting: { component: Meeting, options: { gestureEnabled: false } } // geri yalnizca buton ile gidilebilecek
};
