import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import WelcomePage from "./components/WelcomePage";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(true);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePhoneNumber() {
    setShowOTP(false);
  }

  return (
    <section className="bg-white flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <WelcomePage />
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg">
            {showOTP ? (
              <div className="verify-page">
                <img
                  src="https://res.cloudinary.com/dbj5bk2gm/image/upload/v1695661317/undraw_confirmed_81ex_zppqt3.svg"
                  alt="otp check"
                  className="verify-otp-check-image"
                />
                <h1 className="verify-mobile-line">
                  Please verify Mobile number
                </h1>
                <p className="verify-mobile-otp-sent-line">
                  An OTP is sent to{" "}
                  <span className="mobile-number-verify">+917896781234</span>
                </p>
                <button
                  type="button"
                  onClick={changePhoneNumber}
                  className="verify-change-phone-number"
                >
                  Change Phone Number
                </button>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <div className="verify-otp-not-received">
                  <p className="verify-not-received">
                    Didn’t receive the code?
                  </p>
                  <button
                    type="button"
                    className="verify-otp-resend"
                    onClick={onSignup}
                  >
                    Resend
                  </button>
                </div>
                <button
                  onClick={onOTPVerify}
                  type="button"
                  className="verify-button"
                >
                  Verify
                </button>
              </div>
            ) : (
              <div className="number-page">
                <img
                  src="https://res.cloudinary.com/dbj5bk2gm/image/upload/v1695661317/AK_logo_beduvs.jpg"
                  alt="admitkard logo"
                  className="number-page-logo"
                />
                <h1 className="number-page-heading">Welcome Back</h1>
                <p className="number-back-sign-in-line">
                  Please sign in to your account
                </p>
                <div>
                  <PhoneInput
                    specialLabel={"Enter Contact Number"}
                    country={"in"}
                    enableSearch={true}
                    countryCodeEditable={false}
                    value={ph}
                    onChange={(ph) => setPh(ph)}
                    className="box"
                  />
                </div>
                <p className="number-page-otp-note">
                  We will send you a one time SMS message. Charges may apply.
                </p>
                {/* {phone.length === 12 ? (
                  <Link to="/verify">
                    <button
                      className="number-page-sign-in-button"
                      type="button"
                      onClick={onSignUp}
                    >
                      Sign In with OTP
                    </button>
                  </Link>
                ) : (
                  <button className="number-page-sign-in-button" type="button">
                    Sign In with OTP
                  </button>
                )} */}
                <button className="number-page-sign-in-button" type="button">
                  Sign In with OTP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
