import { useState, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const PasswordGenerator = () => {
  const outputRef = useRef(null);
  const [password, setPassword] = useState({
    output: "",
    length: 20,
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    let upperCaseAlphabets = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let lowerCaseAlphabets = "qwertyuiopasdfghjklzxcvbnm";
    let myNumbers = "1234567890";
    let mySymbols = "`!@#$%^&*()_-+=[{]}\\|;:'\",<>./?";

    let myChars = [];

    if (password.upperCase) {
      myChars.push(upperCaseAlphabets);
    }
    if (password.lowerCase) {
      myChars.push(lowerCaseAlphabets);
    }
    if (password.numbers) {
      myChars.push(myNumbers);
    }
    if (password.symbols) {
      myChars.push(mySymbols);
    }
    if (myChars.length === 0) {
      myChars = [lowerCaseAlphabets, upperCaseAlphabets, myNumbers, mySymbols];
    }

    let passLen = password.length;
    let pass = "";

    for (let i = 0; i < passLen; i++) {
      let randomIndex = Math.floor(Math.random() * myChars.length);
      let ch = Math.round(Math.random() * myChars[randomIndex].length);
      pass += myChars[randomIndex].charAt(ch);
    }
    console.log(pass);
    setPassword({ ...password, output: pass });
  };
  const handleLength = (event) => {
    let len = event.target.value;
    if (len >= 0 && len <= 20) {
      setPassword({ ...password, length: len });
    } else if (len < 0) {
      setPassword({ ...password, length: 0 });
    } else {
      setPassword({ ...password, length: 20 });
    }
  };

  const handleupperCase = () => {
    setPassword({ ...password, upperCase: !password.upperCase });
  };

  const handlelowerCase = () => {
    setPassword({ ...password, lowerCase: !password.lowerCase });
  };

  const handleNumbers = () => {
    setPassword({ ...password, numbers: !password.numbers });
  };

  const handleSymbols = () => {
    setPassword({ ...password, symbols: !password.symbols });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputRef.current.value);
      alert("Password copied to clipboard!");
    } catch (err) {
      console.log("Unable to copy to clipboard", err);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">Password Generator</h3>

      <div className="input-group">
        <input
          ref={outputRef}
          value={password.output}
          disabled
          className="form-control"
          id="clipboardInput"
        />
        <span className="input-group-text" onClick={handleCopy}>
          <i className="bi bi-clipboard"></i>
        </span>
      </div>

      <div className="input-length my-3">
        <label>Password Length</label>
        <input
          value={password.length}
          onChange={handleLength}
          type="number"
          max={20}
          className="output-len"
        />
      </div>

      <div className="input-length my-3">
        <label>Include uppercase letters</label>
        <input
          checked={password.upperCase}
          onChange={handleupperCase}
          type="checkbox"
          className="form-check-input"
        />
      </div>

      <div className="input-length my-3">
        <label>Include lowercase letters</label>
        <input
          checked={password.lowerCase}
          onChange={handlelowerCase}
          type="checkbox"
          className="form-check-input"
        />
      </div>

      <div className="input-length my-3">
        <label>Include numbers</label>
        <input
          checked={password.numbers}
          onChange={handleNumbers}
          type="checkbox"
          className="form-check-input"
        />
      </div>

      <div className="input-length my-3">
        <label>Include symbols</label>
        <input
          checked={password.symbols}
          onChange={handleSymbols}
          type="checkbox"
          className="form-check-input"
        />
      </div>

      <button onClick={generatePassword} className="btn btn-secondary">
        Generate Password
      </button>
    </div>
  );
};
export default PasswordGenerator;
