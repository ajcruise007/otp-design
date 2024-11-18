import React, { useState } from "react";
import OTPInput from "./OTPInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setshowOtpInput] = useState(false);

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = () => {
    // phone number validation
    const regex = /^\d+$/;
    if (phoneNumber.length !== 10 || !regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    // call BE API for otp
    setshowOtpInput(true);
  };

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInputChange}
            value={phoneNumber}
            placeholder="Enter Phone Number"
          />
          <button>Submit</button>
        </form>
      ) : (
        <div>
          {" "}
          OTP sent to number {phoneNumber}
          <OTPInput
            length={4}
            onOtpSubmit={(otp) => {
              console.log("Login successful ", otp);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
