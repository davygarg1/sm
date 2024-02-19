// import react from 'react'
import Data from './data_context'

function DATA(props) {
    return (
        <Data.Provider
        value={"jashan singla data"}>
        {props.children}
        </Data.Provider>  
    )
}

export default DATA;