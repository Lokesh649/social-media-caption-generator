import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
function App() {  
 
  // Firebase automatically handles authentication and tokens
  const geminiApiKey = process.env.GEMINI_api_key; // Using environment variable for secure API key

  
 

  const [content, setContent] = useState('');
  const [tone, setTone] = useState('');
  const [platform, setPlatform] = useState('');
  const [length, setLength] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const prompt = `Create a ${tone} caption for ${content} suitable for ${platform}. Keep the caption under ${length} characters.`;
      const resp = await axios.post(
        // "https://gemini.googleapis.com/v1/text:generate", 
        //"https://us-central1-aiplatform.googleapis.com/v1/projects/social-media-captions-443608/locations/us-central1/models/publishers/google/models/gemini-pro-vision:predict",
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCodA02wD3MtRB_b0zBjrvhLrGtcF_RcJc",
         
       );
      const response =response.data.predictions[0].text;
      setGeneratedCaption(response.data.caption);

      // Clear results for next submission
      setContent('');
      setTone('');
      setPlatform('');
      setLength('');
      
    } catch (error) {
      console.error("Error generating caption:", error);
      alert("Error generating caption, please try again later.");
    }
  };
  

  return (
    <div className="App">
    <div className="header">
      <h1>AI - Social Media Post Caption Generator</h1>
    </div>

    <div className="main-content">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="form-container">
          <form id="postCaptionForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="E.g., food, fitness, travel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tone">Tone</label>
              <select id="tone" name="tone" required value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="">Please select...</option>
                <option value="funny">Funny</option>
                <option value="inspirational">Inspirational</option>
                <option value="motivational">Motivational</option>
                <option value="casual">Casual</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="platform">Platform</label>
              <select id="platform" name="platform" required value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="">Please select...</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Twitter">Twitter</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="length">Length of Caption (characters)</label>
              <input
                type="number"
                id="length"
                name="length"
                required
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="E.g., 150"
              />
            </div>

            <button type="submit">Generate Captions</button>
          </form>

          {generatedCaption && (
            <div id="results" className="results">
              <div className="result-item">
                <h3> Caption Preview</h3>
                <p className="caption-text">{generatedCaption}</p>
                <div className="hashtags">
                  <strong>Hashtags:</strong> # {content} # {tone}
                </div>
                <div className="platform-tag">{platform}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
