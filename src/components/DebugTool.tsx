import React, { useState, useEffect } from 'react';

export const DebugTool: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const analyzeFile = async () => {
    setLoading(true);
    try {
      // Fetch the problematic file
      const response = await fetch('/src/components/PrivacyPolicy.tsx');
      const content = await response.text();
      setFileContent(content);
      
      // Analyze line 78 (index 77)
      const lines = content.split('\n');
      const problemLine = lines[77]; // Line 78 (0-indexed)
      
      if (problemLine) {
        const chars = problemLine.split('').map((char, index) => ({
          char,
          charCode: char.charCodeAt(0),
          index,
          isProblematic: char.charCodeAt(0) > 127 || char === '\\',
          hex: char.charCodeAt(0).toString(16).padStart(4, '0'),
          description: getCharDescription(char)
        }));
        
        setAnalysis(chars);
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    }
    setLoading(false);
  };

  const getCharDescription = (char: string) => {
    const code = char.charCodeAt(0);
    if (code === 92) return 'BACKSLASH (\\) - Potential escape character';
    if (code === 34) return 'DOUBLE QUOTE (")';
    if (code === 39) return 'SINGLE QUOTE (\')';
    if (code > 127) return 'NON-ASCII CHARACTER';
    if (code < 32) return 'CONTROL CHARACTER';
    return 'NORMAL CHARACTER';
  };

  const copyFixedLine = () => {
    const problemLine = fileContent.split('\n')[77];
    if (problemLine) {
      // Remove problematic escape sequences
      const fixed = problemLine
        .replace(/target=\\"_blank"/g, 'target="_blank"')
        .replace(/rel=\\"noopener noreferrer\\"/g, 'rel="noopener noreferrer"')
        .replace(/\\\"/g, '"');
      
      navigator.clipboard.writeText(fixed);
      alert('Fixed line copied to clipboard!');
    }
  };

  useEffect(() => {
    analyzeFile();
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-white border border-red-500 rounded-lg p-4 max-w-md max-h-96 overflow-auto z-50 shadow-lg">
      <h3 className="text-lg font-bold text-red-600 mb-3">Unicode Debug Tool</h3>
      
      {loading && <p>Loading file analysis...</p>}
      
      {analysis.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm">
            <strong>Line 78 Analysis:</strong>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono max-h-32 overflow-auto">
              {analysis.map((item, index) => (
                <span
                  key={index}
                  className={`${item.isProblematic ? 'bg-red-200 text-red-800' : ''}`}
                  title={`Char: ${item.char} | Code: ${item.charCode} | Hex: \\u${item.hex} | ${item.description}`}
                >
                  {item.char === ' ' ? '·' : item.char}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-xs">
            <strong>Problematic Characters Found:</strong>
            <ul className="list-disc list-inside">
              {analysis
                .filter(item => item.isProblematic)
                .map((item, index) => (
                  <li key={index} className="text-red-600">
                    Position {item.index}: '{item.char}' (\\u{item.hex}) - {item.description}
                  </li>
                ))}
            </ul>
          </div>
          
          <button
            onClick={copyFixedLine}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Copy Fixed Line
          </button>
          
          <div className="text-xs text-gray-600">
            <strong>Quick Fix:</strong> Replace escaped quotes (\") with regular quotes (")
          </div>
        </div>
      )}
      
      <button
        onClick={() => setAnalysis([])}
        className="mt-3 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
      >
        Close Debug Tool
      </button>
    </div>
  );
};