import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'

 const Login = ({requestAuthenticateUser,authenticated}) => {
    return (
        <div>
            <h2>Please Login</h2>
            <form onSubmit={requestAuthenticateUser}>
                <div><input type="text" name="username" placeholder="username" defaultValue="Dev" id="username" /></div>
                <div><input type="password" name="password" id="password" placeholder="password" defaultValue="TUBLES" /></div>
                {authenticated===mutations.NOT_AUTHENTICATED?<p>Login Incorrect</p>:null}
                <div><button type="submit">Log In</button></div>
            </form>

        </div>
    )
}

const mapStateToProps = ({session}) => {
    return {
        authenticated:session.authenticated
    }
}

const mapDispatchToProps =(dispatch)=> ({
    requestAuthenticateUser:(e)=>{
        e.preventDefault();
        let username=e.target["username"].value;
        let password=e.target["password"].value;
        dispatch(mutations.requestAuthenticateUser(username,password))

    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
