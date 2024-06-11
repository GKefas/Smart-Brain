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




class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RegisterEmail: '',
            RegisterUsername: '',
            RegisterPassword: '',
            ErrorEmail: false,
            ErrorUsername: false,
            ErrorPassword: false,
            ServerError: ''
        }
    }


    onEmailChange = (event) => {
        this.setState({ RegisterEmail: event.target.value });
    };
    onUsernameChange = (event) => {
        this.setState({ RegisterUsername: event.target.value });
    };
    onPasswordChange = (event) => {
        this.setState({ RegisterPassword: event.target.value });
    };
    ValidateForm = () => {
        let valid = true;
        let userNameExp = new RegExp(/^[a-zA-Z0-9_]+$/i);
        let EmailExp = new RegExp(/^([a-zA-Z0-9]+)@([a-zA-Z]+).([a-zA-Z]+)$/i);
        if (!userNameExp.test(this.state.RegisterUsername)) {
            this.setState({ ErrorUsername: true });
            valid = false;
        } else
            this.setState({ ErrorUsername: false });
        if (!EmailExp.test(this.state.RegisterEmail)) {
            this.setState({ ErrorEmail: true });
            valid = false;
        }
        else
            this.setState({ ErrorEmail: false });
        if (this.state.RegisterPassword.length < 8) {
            this.setState({ ErrorPassword: true });
            valid = false;
        }
        else
            this.setState({ ErrorPassword: false });
        /* */

        return valid;
    }

    onSubmitRegister = () => {
        if (this.ValidateForm()) {
            fetch('https://face-detect-server.up.railway.app/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.RegisterEmail,
                    username: this.state.RegisterUsername,
                    password: this.state.RegisterPassword
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }

                    else {
                        this.setState({ ServerError: user });
                    }
                });
        }
    };




    render() {
        const { onRouteChange } = this.props;
        return (
            <MDBContainer>

                <MDBCard className="pv4 card">
                    <MDBRow className='g-0'>
                        <MDBCol md='6 flex items-center mb-4'>
                            <MDBCardImage src='Login-Image.png' alt="login form" className='rounded-start w-100' />
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>
                                <h3 className="fw-normal my-4 pb-2" style={{ letterSpacing: '1px' }}>Create your account</h3>
                                {this.state.ServerError !== '' ?
                                    <div className='error pb-3' style={{ marginTop: '-2rem', fontSize: '1rem' }}>
                                        {this.state.ServerError}
                                    </div>
                                    : <></>}
                                <MDBInput onChange={this.onUsernameChange} wrapperClass='mb-4' label='Username' type='text' size="lg" />
                                {this.state.ErrorUsername ?
                                    <div className='error' style={{ marginTop: '-1.5rem', fontSize: '0.9rem' }}>
                                        {'Username must start with a letter and contains letters, numbers, or underscores'}
                                    </div>
                                    : <></>}
                                <MDBInput onChange={this.onEmailChange} wrapperClass='mb-4' label='Email' type='email' size="lg" />
                                {this.state.ErrorEmail ?
                                    <div className='error' style={{ marginTop: '-1.5rem', fontSize: '0.9rem' }}>
                                        {'Email looks like name@example.com'}
                                    </div>
                                    : <></>}
                                <MDBInput onChange={this.onPasswordChange} wrapperClass='mb-4' label='Password' type='password' size="lg" />
                                {this.state.ErrorPassword ?
                                    <div className='error' style={{ marginTop: '-1.5rem', fontSize: '0.9rem' }}>
                                        {'Password length must be 8-20 characters'}
                                    </div>
                                    : <></>}

                                <MDBBtn className="mb-4 mt-2 px-5 f5" color='black' size='lg' onClick={this.onSubmitRegister}>Sign up</MDBBtn>
                                <p className="mb-2 pb-lg-2 tc" style={{ color: '#00000' }}>Already have an account?
                                    <span style={{ color: '#005AA7', cursor: 'pointer' }} onClick={() => onRouteChange('signIn')}>&nbsp;Login here</span></p>

                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>
        );
    }
}
export default Register;