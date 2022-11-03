import React, { useState } from 'react';
import 'pages/ShareNotes/index.scss';
import { IoMdArrowDropdown } from 'react-icons/io';

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
        <div className='input-contain'>
          <p>Exam / Year</p>
          <div className='dropdown-contain'>
            <div>
              <label>--</label>
              <IoMdArrowDropdown className='icon' />
            </div>
            <div>
              <label>--</label>
              <IoMdArrowDropdown className='icon' />
            </div>
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
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ShareNotesPage;
