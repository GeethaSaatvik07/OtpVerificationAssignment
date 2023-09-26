import { Component } from "react";
import "./index.css";

class WelcomePage extends Component {
  render() {
    return (
      <div className="welcome-page">
        <img
          src="https://res.cloudinary.com/dbj5bk2gm/image/upload/v1695661318/Artboard_1_pbis8y.jpg"
          alt="welcome page logo"
          className="welcome-page-image"
        />
        <h1 className="welcome-heading">Welcome to AdmitKard</h1>
        <p className="welcome-page-line">
          In order to provide you with a custom experience, <br />
          <span className="welcome-page-line-span">
            we need to ask you a few questions.
          </span>
        </p>
        <button className="welcome-button" type="button">
          Get Started
        </button>
        <p className="welcome-5-min">*This will only take 5 min.</p>
      </div>
    );
  }
}

export default WelcomePage;
