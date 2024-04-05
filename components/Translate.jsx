"use client";
import React from "react";
import { useState } from "react";


const Translate = () => {
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState("");
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleLanguageChange = (event, languageType) => {
    if (languageType === "source") {
      console.log("change")
      setSelectedSourceLanguage(event.target.value);
    } else {
      console.log("change");
      setSelectedTargetLanguage(event.target.value);
    }
  };

  async function AtoB (){
    console.log("AtoB function called!");
const response = await fetch(
  `http://127.0.0.1:5000/translate/${selectedSourceLanguage}/to/${selectedTargetLanguage}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: sourceText }),
  }
);
    console.log("recieved",response)
    if (response.ok) {
      const data = await response.text(); // Get the response body as text
      console.log("received data", data);
      setTranslatedText(data); // Set the translated text to the state variable
    } else {
      console.error("Failed to fetch translation:", response.statusText);
      // Handle error condition if needed
    }
  } 

  const copyTranslatedText = () => {
    const textarea = document.getElementById("translatedmessage");
    if (textarea) {
      textarea.select();
      document.execCommand("copy");
      alert("Text copied to clipboard!");
    }
  };

  return (
    <div>
      <div className="text-center text-3xl font-bold text-customGreen">
        Bi-Directional Translate
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <select
              id="source_language"
              onChange={(e) => handleLanguageChange(e, "source")}
              className="block p-3 w-full text-sm text-green-900 font-semibold bg-gray-50 rounded-lg border border-gray-300"
            >
              <option value="">Select Source Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="arabic">Arabic</option>
              <option value="chinese">Chinese</option>
              <option value="portuguese">Portuguese</option>
              <option value="japanese">Japanese</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
              <option value="korean">Korean</option>
              <option value="turkish">Turkish</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="thai">Thai</option>
              <option value="polish">Polish</option>
              <option value="ykrainian">Ukrainian</option>
              <option value="bengali">Bengali</option>
              <option value="kannada">Kannada</option>
              <option value="tamil">Tamil</option>
            </select>

            <textarea
              id="message"
              rows="10"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Enter text here..."
              sx={"height: auto; resize: vertical;"}
            ></textarea>

            <select
              id="target_language"
              onChange={(e) => handleLanguageChange(e, "target")}
              className="block p-3 w-full text-sm text-green-900 font-semibold bg-gray-50 rounded-lg border border-gray-300"
            >
              <option value="">Select Target Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="arabic">Arabic</option>
              <option value="chinese">Chinese</option>
              <option value="portuguese">Portuguese</option>
              <option value="japanese">Japanese</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
              <option value="korean">Korean</option>
              <option value="turkish">Turkish</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="thai">Thai</option>
              <option value="polish">Polish</option>
              <option value="ykrainian">Ukrainian</option>
              <option value="bengali">Bengali</option>
              <option value="kannada">Kannada</option>
              <option value="tamil">Tamil</option>
            </select>

            <div
              onClick={() => {
                console.log("Translate button clicked!");
                AtoB();
              }}
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Translate
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <textarea
            id="translatedmessage"
            rows="15"
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Translated Message..."
            style={{ height: "auto", resize: "vertical" }}>
            </textarea>
          <button
            onClick={copyTranslatedText}
            className="py-3 mt-1 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Copy
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Translate;
