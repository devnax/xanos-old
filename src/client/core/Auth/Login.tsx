import React from 'react'
import Stack from 'naxui/Stack'
import Input from 'naxui/Input'
import Label from 'naxui/Label'
import Text from 'naxui/Text'
import Button from 'naxui/Button'


const SetupOS = () => {
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
        >
            <Stack
                width={350}
                overflow="hidden"
                radius={2}
            >

                <Stack
                    p={2}
                    gap={16}
                >
                    <Stack gap={4}>
                        <Text variant='h5' >Login</Text>
                    </Stack>
                    {/* <Stack direction="row" gap={16}>
                        <Stack gap={4}>
                            <Label>First Name</Label>
                            <Input />
                        </Stack>
                        <Stack gap={4}>
                            <Label>Last Name</Label>
                            <Input />
                        </Stack>
                    </Stack> */}
                    <Stack gap={4}>
                        <Label>Email</Label>
                        <Input />
                    </Stack>
                    <Stack gap={4}>
                        <Label>Password</Label>
                        <Input type="password" />
                    </Stack>
                    <Stack gap={4}>
                        <Button>Login</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}


export default SetupOS