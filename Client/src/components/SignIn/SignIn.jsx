import { Component } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUsername: '',
      signInPassword: '',
      loginError: false
    }
  }

  onUsernameChange = (event) => {
    this.setState({ signInUsername: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    fetch('https://face-detect-server.up.railway.app/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.signInUsername,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else {
          this.setState({ signInPassword: '' });
          this.setState({ loginError: true })
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <MDBContainer>

        <MDBCard className="pv4 card">
          <MDBRow className='g-0'>

            <MDBCol md='6 flex items-center mb-4 mt-4'>
              <MDBCardImage src='Login-Image.png' alt="login form" className='rounded-start w-100' />
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <h3 className="fw-normal my-4 pb-2" style={{ letterSpacing: '1px' }}>Sign into your account</h3>
                {this.state.loginError ?
                  <div className='error pb-3' style={{ marginTop: '-1.5rem' }}>
                    {'Invalid Username or password'}
                  </div>
                  : <></>
                }
                <MDBInput onChange={this.onUsernameChange}
                  wrapperClass='mb-4' label='Username' type='text' size="lg" />
                <MDBInput onChange={this.onPasswordChange}
                  wrapperClass='mb-4' label='Password' type='password' size="lg" value={this.state.signInPassword} />

                <MDBBtn className="mb-4 mt-2 px-5 f5" color='black' size='lg' onClick={this.onSubmitSignIn}>Login</MDBBtn>
                <p className="mb-2 pb-lg-2 tc" style={{ color: '#00000' }}>Don&apos;t have an account?
                  <span style={{ color: '#005AA7', cursor: 'pointer' }} onClick={() => onRouteChange('register')}>&nbsp;Register here</span></p>

              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>

      </MDBContainer>
    );
  }

}
export default SignIn;
