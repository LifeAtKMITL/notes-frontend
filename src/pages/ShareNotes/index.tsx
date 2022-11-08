import React, { useState } from 'react';
import 'pages/ShareNotes/index.scss';
import DropdownSelect from 'components/dropdown-select';

const ShareNotesPage = () => {
  const handleSubmit = () => {
    return;
  };
  const handleChange = () => {
    return;
  };

  const [tosentExam, setTosentExam] = useState<string>('Exam');
  const [tosentYear, setTosentYear] = useState<string>('Year');

  const updateState = (state: string): void => {
    if (!isNaN(Number(state))) {
      setTosentYear(state);
    } else {
      if (state === 'Year') {
        setTosentYear(state);
      } else {
        setTosentExam(state);
      }
    }
  };

  return (
    <div>
      <form className='form-sharing' onSubmit={handleSubmit}>
        <div className='title'>
          <h2>New Note</h2>
        </div>
        <div className='input-contain'>
          <p>Subject ID</p>
          <input type='text' />
        </div>
        <div className='input-contain'>
          <p>Teacher Name</p>
          <input type='text' />
        </div>
        <div className='exam-year'>
          <p>Exam / Year</p>
          <div className='flex-row'>
            <DropdownSelect
              className='to-ddsl'
              iconSize={16}
              lst={['Midterm', 'Final']}
              defaultVal='Exam'
              updateState={updateState}
            />
            <DropdownSelect
              className='to-ddsl'
              iconSize={16}
              lst={Array.from({ length: 10 }, (v, k) => (new Date().getFullYear() - k).toString())}
              defaultVal='Year'
              updateState={updateState}
            />
          </div>
        </div>
        <div className='input-contain'>
          <p>Description</p>
          <textarea></textarea>
        </div>
        <div className='file-contain'>
          <p>File</p>
          <input type='file' />
        </div>
        <div>
          <button className='button-submit' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareNotesPage;
