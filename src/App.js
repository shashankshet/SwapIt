import React from 'react';
import FindReplaceForm from './component/FindReplaceForm';

const App = () => {
  const performFindReplace = (inputText, findText, replaceText) => {
    try {
      const replacedText = inputText.replace(new RegExp(findText, 'g'), replaceText);
      return replacedText;
    } catch (error) {
      alert('An error occurred: ' + error);
      return inputText;
    }
  };

  return (
    <div className="App">
      <center><h1>SwapIt</h1></center>
      
      <FindReplaceForm onReplace={performFindReplace} />
    </div>
  );
};

export default App;
