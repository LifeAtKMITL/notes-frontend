import React, { useState } from 'react';
import 'pages/ShareNotes/index.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownSelect from 'components/dropdown-select';

const ShareNotesPage = () => {
  // type InForm = {
  //   subjectID: number;
  //   teacherName: string;
  //   exam: string;
  //   academicYear: number;
  //   description: string;
  //   fileUpload: File;
  // };
  // const [form, setForm] = useState<InForm>();
  // //   { subjectID: 0, teacherName: '', exam: '', academicYear: 0 }
  // const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const temp: any = { ...form };
  //   if (e.currentTarget.name != 'fileUpload') {
  //     temp[e.currentTarget.name] = e.currentTarget.value;
  //   } else {
  //     temp['fileUpload'] = e.currentTarget.files;
  //   }
  //   setForm(temp);
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(form);
  // };

  //temp
  const handleSubmit = () => {
    return;
  };
  const handleChange = () => {
    return;
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
            <DropdownSelect lst={['nani', 'anya', 'Yor', 'Loid', 'bond']} className='to-ddsl' iconSize={16} />
            <DropdownSelect lst={['nani', 'anya', 'Yor', 'Loid', 'bond']} className='to-ddsl' iconSize={16} />
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
