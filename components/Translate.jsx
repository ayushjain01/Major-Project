"use client";
import React from "react";
import { useState } from "react";

const Translate = () => {
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState("");
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceEmotion, setSourceEmotion] = useState([]);
  const [translatedEmotion, setTranslatedEmotion] = useState([]);
  const [similarityScore, setSimilarityScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const handleLanguageChange = (event, languageType) => {
    if (languageType === "source") {
      console.log("change");
      setSelectedSourceLanguage(event.target.value);
      setTranslatedText("");
      setSimilarityScore(0);
      setAttempts(0);
      setSourceEmotion([]);
      setTranslatedEmotion([]);
    } else {
      console.log("change");
      setSelectedTargetLanguage(event.target.value);
      setTranslatedText("");
      setSimilarityScore(0);
      setAttempts(0);
      setSourceEmotion([]);
      setTranslatedEmotion([]);
    }
  };

  async function AtoB() {
    setTranslatedText("");
    setSourceEmotion([]);
    setTranslatedEmotion([]);
    setSimilarityScore(0);
    setAttempts(0);
    console.log("AtoB function called!");
    const response = await fetch(
      `http://127.0.0.1:5000/translate/${selectedSourceLanguage}/to/${selectedTargetLanguage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: sourceText.toString(),
      }
    );
    console.log("received", response);
    if (response.ok) {
      const data = await response.json();
      console.log("received data", data);
      detectEmotion(sourceText, setSourceEmotion, selectedSourceLanguage);
      detectEmotion(
        data.response,
        setTranslatedEmotion,
        selectedTargetLanguage
      );
      setTranslatedText(data.response);
      setSimilarityScore(data.score);
      setAttempts(data.attempts);
    } else {
      console.error("Failed to fetch translation:", response.statusText);
    }
  }

  async function detectEmotion(text, setEmotion, language) {
    console.log("detectEmotion function called!");
    const response = await fetch(
      `http://127.0.0.1:5000/detect-emotions/${language}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setEmotion(data);
    } else {
      console.error("Failed to detect emotion:", response.statusText);
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

  const renderEmotion = (emotion) => {
    return (
      <div>
        {emotion.map((item, index) => (
          <div key={index} className="flex items-center mt-2">
            <span className="mr-2">{item.emoji}</span>
            <span className="mr-2">{item.label}</span>
            <span>{item.score}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="text-center text-3xl font-bold text-customGreen">
        Bi-Directional Translation
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
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
              <option value="bengali">Bengali</option>
              <option value="telugu">Telugu</option>
              <option value="tamil">Tamil</option>
              <option value="urdu">Urdu</option>
              <option value="gujarati">Gujarati</option>
              <option value="kannada">Kannada</option>
              <option value="malayalam">Malayalam</option>
              <option value="punjabi">Punjabi</option>
              <option value="odia">Odia</option>
              <option value="assamese">Assamese</option>
              <option value="nepali">Nepali</option>
              <option value="konkani">Konkani</option>
              <option value="manipuri">Manipuri (Meitei)</option>
              <option value="maithili">Maithili</option>
              <option value="santali">Santali</option>
              <option value="kashmiri">Kashmiri</option>
              <option value="sindhi">Sindhi</option>
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
              <option value="ukrainian">Ukrainian</option>
            </select>

            <textarea
              id="message"
              rows="15"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Enter text here..."
              sx={"height: auto; resize: vertical;"}
            ></textarea>
            <button
              onClick={() => {
                console.log("Translate button clicked!");
                AtoB();
              }}
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Translate
            </button>
            <div className="block p-3 w-full text-sm text-green-900 font-semibold bg-gray-50 rounded-lg border border-gray-300">
              <div className="font-bold mb-2">Source Emotions:</div>
              {renderEmotion(sourceEmotion)}
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <select
              id="target_language"
              onChange={(e) => handleLanguageChange(e, "target")}
              className="block p-3 w-full text-sm text-green-900 font-semibold bg-gray-50 rounded-lg border border-gray-300"
            >
              <option value="">Select Target Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="bengali">Bengali</option>
              <option value="telugu">Telugu</option>
              <option value="tamil">Tamil</option>
              <option value="urdu">Urdu</option>
              <option value="gujarati">Gujarati</option>
              <option value="kannada">Kannada</option>
              <option value="malayalam">Malayalam</option>
              <option value="punjabi">Punjabi</option>
              <option value="odia">Odia</option>
              <option value="assamese">Assamese</option>
              <option value="nepali">Nepali</option>
              <option value="konkani">Konkani</option>
              <option value="manipuri">Manipuri (Meitei)</option>
              <option value="maithili">Maithili</option>
              <option value="santali">Santali</option>
              <option value="kashmiri">Kashmiri</option>
              <option value="sindhi">Sindhi</option>
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
              <option value="ukrainian">Ukrainian</option>
            </select>

            <textarea
              id="translatedmessage"
              rows="15"
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Translated Message..."
              style={{ height: "auto", resize: "vertical" }}
            ></textarea>
            <button
              onClick={copyTranslatedText}
              className="py-3 mt-1 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Copy
            </button>
            <div className="block p-3 w-full text-sm text-green-900 font-semibold bg-gray-50 rounded-lg border border-gray-300">
              <div className="font-bold mb-2">Translated Emotions:</div>
              {renderEmotion(sourceEmotion)}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-2xl font-bold text-customGreen m-4">
        Translation Summary
      </div>
      <div className="flex justify-center mb-4">
        <div className="flex flex-col mr-8">
          <span className="text-lg font-semibold text-customGreen">
            Similarity Score: {similarityScore}%
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-customGreen">
            Number of Attempts: {attempts}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Translate;
