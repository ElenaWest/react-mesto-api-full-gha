import Main from "./Main"

function ProtectedRouteContent({ ...props }) {
    return(
        <>        
          <Main
            name='main'
            {...props}
           />
        </>
    )
}

export default ProtectedRouteContent;