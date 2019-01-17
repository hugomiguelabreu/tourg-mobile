import {decorate, observable, action, configure} from "mobx"
import { create, persist } from 'mobx-persist'
import { AsyncStorage } from "react-native";
import axios from "axios";

class User {
    @persist @observable token = null;
    @persist @observable id = null;
    @persist @observable email = "";
    @persist @observable password = "";
    @persist @observable name = "";
    @persist @observable phone = "";
    @persist @observable bio = "";
    @persist @observable createdAt = null;
    @persist @observable photo_path = null;

    @action login(data){
        this.token = data.token;
        this.id = data.user.id;
        this.email = data.user.email;
        this.password = data.user.password;
        this.name = data.user.name;
        this.phone = data.user.phone;
        this.bio = data.user.bio;
        this.createdAt = data.user.createdAt;
        this.photo_path = data.user.photo_path;
    }

    @action updateUser(data){
        this.name = data.name;
        this.phone = data.phone;
        this.bio = data.bio;
    }

    @action updatePhoto(uri){
        this.photo_path = uri;
    }

    @action logout(){
        this.token = null;
        this.id = null;
        this.email = "";
        this.password = "";
        this.name = "";
        this.phone = "";
        this.bio = "";
        this.createdAt = null;
        this.photo_path = null;
    }
}

configure({enforceActions: 'observed'});

const userStore = new User();

const hydrate = create({
    storage: AsyncStorage,   // or AsyncStorage in react-native.
                            // default: localStorage
    jsonify: true  // if you use AsyncStorage, here shoud be true
                    // default: true
});

hydrate('user', userStore)
    .then(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token;
        console.log(userStore.token);
        console.log('Success')
    })
    .catch(() => console.log('Couldn\'t hydrate'));

export default userStore;