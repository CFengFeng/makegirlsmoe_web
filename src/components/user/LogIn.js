import React, { Component } from 'react';
import { connect } from 'react-redux';
import Config from '../../Config.js';
import { userAction } from '../../_actions';
import './User.css'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userAction.userLogout());
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        //console.log(username, password);
        if (username && password) {
            this.props.dispatch(userAction.userLogin(username, password));
        }
    }

    render(){
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h3 style={{color: Config.colors.theme}}>User Login</h3>
                <form  onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="username"
                               className={"form-control form-group"+ (submitted && !username ? ' has-error' : '')}
                               value={username}  onChange={this.handleChange}
                               placeholder="Username"/>
                    </div>
                    {submitted && !username &&
                        <div className="help-block warning-text">Username cannot be empty!</div>
                    }
                    <p></p>
                    <div>
                        <input type="password" name="password"
                               className={"form-control form-group"+ (submitted && !username ? ' has-error' : '')}
                               value={password} onChange={this.handleChange}
                               placeholder="Password"/>
                    </div>
                    {submitted && !password &&
                        <div className="help-block warning-text">Password cannot be empty!</div>
                    }
                    <p></p>
                    {/*<p>
                        <label>
                            <input type="checkbox" value="remember-me" id="rememberMe"
                                   name="rememberMe"/>
                            Remember me
                        </label>
                     </p>*/
                    }
                    {submitted && username && password && this.props.loginFailed &&
                        <div className="help-block warning-text">The user name or password is incorrect.</div>
                    }
                    <div  className="form-group">
                        {this.props.loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, loginFailed } = state.authentication;
    return {
        loggingIn,
        loginFailed
    };
}

export default connect(mapStateToProps)(LogIn);