import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";

const App = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("markdown");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchContent = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setContent("");

    try {
      const response = await axios.get(`https://r.jina.ai/${url}`, {
        headers: { "X-Return-Format": format },
      });

      setContent(response.data);
    } catch (err) {
      setError("Error fetching content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h1>Jina Reader - URL to Markdown</h1>
      <p>
        Enter a URL to extract **Markdown, HTML, or Text** using Jina Reader API.
      </p>

      {/* Input Field */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={styles.select}
        >
          <option value="markdown">Markdown</option>
          <option value="html">HTML</option>
          <option value="text">Text</option>
          <option value="llm_markdown">LLM Markdown</option>
        </select>
        <button onClick={fetchContent} style={styles.button} disabled={loading}>
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {/* Loading & Error Messages */}
      {loading && <p style={styles.loading}>Fetching content...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Display Extracted Content */}
      {content && (
        <div style={styles.result}>
          <textarea
            value={content}
            readOnly
            style={styles.textarea}
          ></textarea>
          <button onClick={handleCopy} style={styles.copyButton}>
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>

          {/* Render Markdown */}
          {format === "markdown" && (
            <div
              style={styles.preview}
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            ></div>
          )}

          {/* Render HTML Preview */}
          {format === "html" && (
            <iframe
              title="HTML Preview"
              srcDoc={content}
              style={styles.iframe}
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "50%",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  loading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "blue",
  },
  error: {
    fontSize: "16px",
    color: "red",
  },
  result: {
    marginTop: "20px",
    textAlign: "left",
  },
  textarea: {
    width: "100%",
    height: "200px",
    fontSize: "14px",
    padding: "10px",
    resize: "vertical",
  },
  copyButton: {
    marginTop: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    width: "100%",
  },
  preview: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  iframe: {
    width: "100%",
    height: "500px",
    border: "1px solid #ccc",
  },
};

export default App;
