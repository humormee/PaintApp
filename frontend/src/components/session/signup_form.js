import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    // this.props.signup(user, this.props.history)
    //   .then(() => {
    //   if(this.props.)
    // })
    this.props.signup(user, this.props.history)
        .then(res => {
          // debugger
          if(!!res.errors) {
            return
          } else {
            this.props.login(user)
          }
          }
        )
        .catch(() => console.log('trouble signing up'))

    
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            {/* <div className="formbacksign">
              <img src="https://cdn.discordapp.com/attachments/597985513701376013/867246418484658176/Form_Background.png" alt="formbackground">
              </img>
            </div> */}

            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />

            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="Username"
            />

            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />

            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />

            <input type="submit" value="Sign Up" className="submit"/>
            {this.renderErrors()}
          </div>
        </form>
        <br/>
        <div>
          <span className="account">Already have an account? </span>
          <Link to='/login' className='alreadyMember'>Login </Link></div>
      </div>
    );
  }
}

export default withRouter(SignupForm);