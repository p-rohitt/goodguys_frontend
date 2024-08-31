import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = ({ code, language }) => {
  const codeLines = code.split('\n');

  return (
    <div className="code-block-container   my-5 rounded-2xl overflow-scroll">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        showLineNumbers={true}
        wrapLines={true}
        className="bg-white"
        lineProps={(lineNumber) => {
          const style = { display: 'block' };
          if (codeLines[lineNumber - 1].trim().startsWith('+')) {
            style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
            style.borderLeft = '3px solid green';
          }
          return { style };
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;