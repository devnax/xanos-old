import React from 'react'
import Stack from 'naxui/Stack'
import Input from 'naxui/Input'
import Label from 'naxui/Label'
import Text from 'naxui/Text'
import Button from 'naxui/Button'
import AuthHandler from '../Handler'
import useForm from '../../../libs/useForm'

const ConfirmCode = () => {
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
                    <Text variant='h5' >Verification</Text>
                    <Text variant='subtext' fontSize="fontsize.block" >Please check your email. We sent a 6 digit verification code to your email</Text>
                </Stack>

                <Stack gap={4}>
                    <Stack flexRow gap={8} justifyContent="space-between">
                        <Label fontWeight={500}>Code</Label>
                        <Text
                            fontSize="fontsize.block"
                            cursor="pointer"
                            color="color.primary"
                            onClick={() => {
                                AuthHandler.setMeta("formView", "reset")
                            }}
                        >Resend code</Text>
                    </Stack>
                    <Input
                        textAlign="center"
                        placeholder='******'
                    />
                </Stack>

                <Stack >
                    <Button
                        onClick={() => {
                            AuthHandler.setMeta("formView", "new-password")
                        }}
                    >Confirm</Button>

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


export default ConfirmCode