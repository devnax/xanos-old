import { Store } from 'state-range'

type Meta = {
    formView: "login" | "register" | "reset" | "confirm-code" | "new-password";
    loadingAuth: boolean;
    auth: {}
}

class AuthHandler extends Store<any, Meta> {

}


export default new AuthHandler