import React from 'react'
import Stack from 'naxui/Stack'
import { withStore } from 'state-range'
import AuthHandler from '../Handler'
import useBlurCss from 'naxui/useBlurCss'
import LoginForm from './Login'
import RegisterForm from './Register'
import ResetForm from './Reset'
import NewPasswordForm from './NewPassword'
import ConfirmCodeForm from './ConfirmCode'


const Auth = () => {
    const blurCss = useBlurCss(30)

    const formView = AuthHandler.getMeta("formView", "login")
    let form = <LoginForm />
    switch (formView) {
        case "register":
            form = <RegisterForm />
            break;
        case "reset":
            form = <ResetForm />
            break;
        case "confirm-code":
            form = <ConfirmCodeForm />
            break;
        case "new-password":
            form = <NewPasswordForm />
            break;

    }
    return (
        <Stack
            height="100%"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={999999999}
            {...blurCss}
        >
            {form}
        </Stack>
    )
}


export default withStore(Auth)
