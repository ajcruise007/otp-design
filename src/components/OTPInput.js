import React, { useEffect, useRef, useState } from "react";

const OTPInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);
  const handleChange = (ind, e) => {
    const val = e.target.value;
    if (isNaN(val)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[ind] = val.substring(val.length - 1);
    setOtp(newOtp);
    // submit otp logic
    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // move on to the next input field after current field is filled
    if (val && ind < newOtp.length - 1 && inputRef.current[ind + 1]) {
      inputRef.current[ind + 1].focus();
    }
  };
  const handleClick = (e, ind) => {
    if (inputRef.current[ind]) {
      inputRef.current[ind].setSelectionRange(1, 1);
      if (ind > 0 && !otp[ind - 1]) {
        inputRef.current[otp.indexOf("")].focus();
      }
    }
  };

  const handleKeyDown = (e, ind) => {
    console.log("inside", e.key);
    if (e.key === "Backspace") {
      if (inputRef.current[ind - 1] && !otp[ind]) {
        inputRef.current[ind - 1].focus();
      }
    }
  };

  return (
    <div>
      {otp.map((val, ind) => {
        return (
          <input
            key={ind}
            ref={(input) => {
              inputRef.current[ind] = input;
            }}
            value={val}
            onChange={(e) => handleChange(ind, e)}
            onKeyDown={(e) => handleKeyDown(e, ind)}
            onClick={(e) => handleClick(e, ind)}
            className="otp-input"
          />
        );
      })}
    </div>
  );
};

export default OTPInput;
