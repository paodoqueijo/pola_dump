import React, { useEffect } from 'react';
import RichTextEditor from 'react-rte';
import { useState } from 'react';
import '../../styles/text-edit.scss';
import { projectFirestore } from '../../firebase/config';

function TextEdit({ page }) {
  const [text, setText] = useState(RichTextEditor.createEmptyValue());
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (page) {
      setText(RichTextEditor.createValueFromString(page.text, 'html'));
      setTitle(page.title);
    }
  }, [page]);

  function handleTextChange(value) {
    setText(value);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (page) {
      projectFirestore
        .collection('root')
        .doc(page.name)
        .update({ text: text.toString('html'), title })
        .then(() => {
          console.log('updated');
        })
        .catch((err) => {
          console.log('Error saving new text and title', err);
        });
    }
  };

  return (
    <div className="text-edit">
      <form onSubmit={handleSave}>

        {page.name === "About" && (
        <>
          <label for="title">Title:</label>
          <input
            value={title}
            onChange={handleTitleChange}
            name="title"
            type="text"
          />
        </>
        )}
        <label for="text">Text:</label>
        <RichTextEditor
          className="editor"
          name="text"
          value={text}
          onChange={handleTextChange}
        />
        <button className="save">Save Text Changes</button>
      </form>
    </div>
  );
}

export default TextEdit;
