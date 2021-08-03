import { Route, Redirect } from "react-router-dom";

const RouterWrapper = ({
    component: Component,
    isPrivate,
    ...rest
}) =>{
    const loading = false;
    const signed = true;

    if(loading){
        return (
            <div></div>
        )
    }
    if(!signed && isPrivate){
        return <Redirect to="/" />
    }
    if(signed && !isPrivate){
        return <Redirect to="/dashboard" />
    }

    return (
        <Route {...rest} render={props => (<Component {...props} />)}/>
    )
}

export default RouterWrapper