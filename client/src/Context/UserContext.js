import React, { createContext, useState } from 'react'

export const UsersContext = createContext()

export const UsersProvider = (props) => {
    const [user, setUser] = useState({})

    return <UsersContext.Provider>{props.children}</UsersContext.Provider>
}
