import React from 'react';

const TextInput = (props) => (
  <div className="TextInput">
    <input required type="text" className="TextInput__input" value={props.value}
      onChange={(event) => props.onTextChange(event.target.value)} />
    <label className="TextInput__label">{props.label}</label>
  </div>
);

export default TextInput;