
import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

export const State = () => {
    const [update, setUpdate] = useState({ fname: "abc", lname: "xyz", age: 25, gender: "Male" })

    const update1 = () => {
        console.log("-------------", update);
        setUpdate((preValues) => ({ ...preValues, fname: "123" }))

    }
    console.log("-------update------", update);
    return (
        <React.Fragment>
            <div>hy</div>
            <button onClick={() => update1()}>update</button>
        </React.Fragment>
    )
}

export default State;