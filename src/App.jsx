import { useCallback, useState, useEffect, useRef } from 'react'
import "./index.css"

function App() {
  const [length, setLength] = useState(6);
  const [hasNumber, setNumber] = useState(false);
  const [hasCharacter, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (hasNumber) letters += "0123456789";
    if (hasCharacter) letters += "%@^#$&*_~";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * letters.length);
      pass += letters[randomIndex];
    }

    setPassword(pass);

  }, [length, hasNumber, hasCharacter, setPassword]);


  const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, hasNumber, hasCharacter, passwordGenerator])

  
  
  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-2xl p-6 text-orange-400">

        <h1 className="text-white text-center text-2xl font-semibold mb-6">
          Password Generator
        </h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-5">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            placeholder="Your password..."
            className="w-full py-2 px-3 bg-gray-700 text-white outline-none"
          />

          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition"
          >

          {copied ? "Copied!" : "Copy"}
          </button>
       </div>

    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor="length">Length: {length}</label>
        <input
          id="length"
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer w-2/3 accent-orange-500"
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label htmlFor="numberInput">Include Numbers</label>
        <input
          id="numberInput"
          type="checkbox"
          checked={hasNumber}
          className="accent-orange-500 w-4 h-4"
          onChange={() => setNumber((prev) => !prev)}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label htmlFor="characterInput">Include Symbols</label>
        <input
          id="characterInput"
          type="checkbox"
          checked={hasCharacter}
          className="accent-orange-500 w-4 h-4"
          onChange={() => setCharacter((prev) => !prev)}
        />
      </div>
    </div>
  </div>
</div>

  )
}

export default App
