import React from "react";
import { withStore } from "state-range";
import UsersTable from "./UsersTable";
import ListView from "../../components/ListView";
import RoleTable from "./Roles";
import IconUser from 'naxui-icons/round/People'
import IconRole from 'naxui-icons/round/VerifiedUser'

const UsersView = () => {
    return (
        <ListView
            title="User & Role"
            sidebarSize={270}
            list={[
                {
                    label: "Users",
                    value: "users",
                    render: UsersTable,
                    startIcon: <IconUser />
                },
                {
                    label: "Roles",
                    value: "Roles",
                    render: RoleTable,
                    startIcon: <IconRole />
                }
            ]}


        />
    )
}

export default withStore(UsersView)