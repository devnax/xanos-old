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

const NewPassword = () => {
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
                    <Text variant='h5' >Set new password</Text>
                    <Text variant='subtext' fontSize="fontsize.block" >Get access to your account by reseting your password</Text>
                </Stack>


                <Stack gap={4}>
                    <Label fontWeight={500}>Password</Label>

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
                    <Label fontWeight={500}>Confirm new password</Label>

                    <Input
                        textAlign="center"
                        type={form.get("showPassword") ? "text" : "password"}
                    />
                </Stack>
                <Stack gap={16}>
                    <Button>Reset Password</Button>
                </Stack>
                <Stack flexRow gap={8} justifyContent="center">
                    <Text fontSize="fontsize.block" typography="subtext"></Text>
                    <Text
                        fontSize="fontsize.block"
                        cursor="pointer"
                        color="color.primary"
                        onClick={() => {
                            AuthHandler.setMeta("formView", "login")
                        }}
                    >Cancel</Text>
                </Stack>
            </Stack>

        </Stack>
    )
}


export default NewPassword