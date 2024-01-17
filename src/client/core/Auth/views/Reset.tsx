import React from 'react'
import Stack from 'naxui/Stack'
import Input from 'naxui/Input'
import Label from 'naxui/Label'
import Text from 'naxui/Text'
import Button from 'naxui/Button'
import AuthHandler from '../Handler'
import useForm from '../../../libs/useForm'

const Reset = () => {
    const form = useForm({
        email: "",
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
                    <Text variant='h5' >Forgot you password?</Text>
                    <Text variant='subtext' fontSize="fontsize.block" >Enter your email address and we'll email you a verification code to reset your password</Text>
                </Stack>

                <Stack gap={4}>
                    <Label fontWeight={500}>Email</Label>
                    <Input />
                </Stack>

                <Stack >
                    <Button
                        onClick={() => {
                            AuthHandler.setMeta("formView", "confirm-code")
                        }}
                    >Recover password</Button>
                </Stack>
                <Stack flexRow gap={8} justifyContent="center">
                    <Text fontSize="fontsize.block" typography="subtext">Already have an account?</Text>
                    <Text
                        fontSize="fontsize.block"
                        cursor="pointer"
                        color="color.primary"
                        onClick={() => {
                            AuthHandler.setMeta("formView", "login")
                        }}
                    >Login</Text>
                </Stack>
            </Stack>

        </Stack>
    )
}


export default Reset