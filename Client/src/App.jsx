import { Component } from "react";
import ParticlesBg from "particles-bg";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'tachyons';
import Navigation from "./components/Navigation/Navigation.jsx";
import Rank from "./components/Rank/Rank.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import Register from "./components/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";




const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'signIn',
  isLoggedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("ImageOutput");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    this.setState({ box: {} });
    fetch('https://face-detect-server.up.railway.app/Clarifai', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: this.state.input
      })
    })
      .then(response => response.json())
      .then((result) => {
        if (result) {
          fetch('https://face-detect-server.up.railway.app/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(console.log());
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch(error => console.log("error", error));
  };

  onRouteChange = (route) => {
    route === 'home' ?
      this.setState({ isLoggedIn: true }) :
      this.setState(initialState);

    this.setState({ route: route });
  };

  render() {
    const { isLoggedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">

        <ParticlesBg type="cobweb" bg={true} num={75} color="#171717" />
        <div className="TopContainer">
          <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn} />
          <Logo />
        </div>
        <div className="midContainer mb-5 mt-4">
          {route === 'home' ?
            <>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </> : (route === 'signIn') ?
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          }
        </div>
        <Footer className="footerClass" />
      </div>
    );
  }
}

export default App;
console.log