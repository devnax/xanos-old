import React from 'react'
import Stack from 'naxui/Stack'
import Input from 'naxui/Input'
import Label from 'naxui/Label'
import Text from 'naxui/Text'
import Button from 'naxui/Button'
import IconButton from 'naxui/IconButton'
import AuthHandler from '../Handler'
import EyeIcon from 'naxui-icons/round/Visibility'
import EyeOffIcon from 'naxui-icons/round/VisibilityOff'
import useForm from '../../../libs/useForm'

const Login = () => {
    const form = useForm({
        email: "",
        password: "",
        showPassword: false
    })

    return (
        <Stack
            width={360}
            overflow="hidden"
            radius={2}
            bgcolor="color.paper.light"
        >

            <Stack
                p={3}
                gap={20}
            >
                <Stack gap={4} mb={2} alignItems="center" textAlign="center">
                    <Text variant='h5' >Login</Text>
                    <Text variant='subtext' fontSize="fontsize.block" >Enter your credentials to access your account</Text>
                </Stack>

                <Stack gap={4}>
                    <Label fontWeight={500}>Email</Label>
                    <Input />
                </Stack>
                <Stack gap={4}>
                    <Stack flexRow gap={8} justifyContent="space-between">
                        <Label fontWeight={500}>Password</Label>
                        <Text
                            fontSize="fontsize.block"
                            cursor="pointer"
                            color="color.primary"
                            onClick={() => {
                                AuthHandler.setMeta("formView", "reset")
                            }}
                        >Forgot Password?</Text>
                    </Stack>
                    <Input
                        textAlign="center"
                        type={form.get("showPassword") ? "text" : "password"}
                        endIcon={
                            <Stack>
                                <IconButton
                                    size={30}
                                    variant="text"
                                    onClick={() => {
                                        form.set("showPassword", !form.get("showPassword"))
                                    }}
                                >
                                    {
                                        !form.get("showPassword") ? <EyeIcon fontSize={20} /> : <EyeOffIcon fontSize={20} />
                                    }

                                </IconButton>
                            </Stack>
                        }
                    />
                </Stack>
                <Stack gap={4}>
                    <Button>Login</Button>
                </Stack>
                <Stack flexRow gap={8} justifyContent="center">
                    <Text fontSize="fontsize.block" typography="subtext">Need an account?</Text>
                    <Text
                        fontSize="fontsize.block"
                        cursor="pointer"
                        color="color.primary"
                        onClick={() => {
                            AuthHandler.setMeta("formView", "register")
                        }}
                    >Create Account</Text>
                </Stack>
            </Stack>

        </Stack>
    )
}


export default Login