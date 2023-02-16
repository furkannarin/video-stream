import { makeObservable, observable, action } from 'mobx';

class User {
    @observable private name: string | null = null;
    @observable private email: string | null = null;
    @observable private role: 'consultant' | 'user' | null = null;
    @observable private allowed_call_duration = { minutes: 15, seconds: 0 };
    @observable private isJoined: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action login(name: string | null, email: string | null, role: 'consultant' | 'user') {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    getUserInfo() {
        return { name: this.name, email: this.email, role: this.role, call_duration: this.allowed_call_duration };
    }

    getUserJoinedState() {
        return this.isJoined;
    }

    @action setJoinedState(state: boolean) {
        this.isJoined = state;
    }

}

export default User;
