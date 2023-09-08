import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //password ref
  const passwordRef = useRef(null);
  //creating password
  const passwordGenerator = useCallback(() => {
    let generatingPass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@!#$%&*";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      generatingPass += str.charAt(char);
    }
    setPassword(generatingPass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(passwordGenerator, [
    length,
    numAllowed,
    charAllowed,
    passwordGenerator,
  ]);
  console.log(password);
  return (
    <div className=" w-full max-w-md bg-gray-800 mx-auto my-8 px-4 py-3 rounded-lg">
      <h1 className=" text-center text-white font-bold text-3xl">
        Password Generator
      </h1>
      <div className=" flex mt-2 gap-2">
        <input
          type="text"
          className=" w-full rounded-md px-3 py-1 outline-none"
          placeholder="password"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          className=" bg-blue-500 text-white rounded-md py-1 px-3 shrink-0"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className=" flex gap-4 text-white">
        <div className=" flex gap-1 items-center">
          <input
            className=" cursor-pointer"
            type="range"
            min={8}
            max={20}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length({length})</label>
        </div>
        <div className=" flex gap-1 items-center">
          <input
            type="checkbox"
            id="numInput"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numInput">Number</label>
        </div>
        <div className=" flex gap-1 items-center">
          <input
            type="checkbox"
            id="charInput"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Char</label>
        </div>
      </div>
    </div>
  );
};

export default App;
