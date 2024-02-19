// import react from 'react'
import Api from './api_context'

function API(props) {
    return (
        <Api.Provider
        value={"jashan singla api"}>
        {props.children}
        </Api.Provider>   
  )
}

export default API;