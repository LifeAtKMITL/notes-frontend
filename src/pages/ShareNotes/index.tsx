import React, { useEffect, useRef, useState } from 'react';
import 'pages/ShareNotes/index.scss';
import DropdownSelect from 'components/dropdown-select';
import { ISubject } from 'types/Form';

import temp from 'assets/images/newnote.png';
import Loading from 'components/loading';
import axiosInstance from 'utils/axios';

const ShareNotesPage = () => {
  // var
  let formData = new FormData();
  const teacherNameRef = useRef<HTMLInputElement>(null);
  const decriptionRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFiles] = useState<File>();
  const [Cover, setCover] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [showSubjects, setShowSubjects] = useState<boolean>(false);
  const [tosendSubjectId, setTosendSubjectId] = useState<string>('');
  const [tosendSubjectName, setTosendSubjectName] = useState<string>('');
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  // Function
  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files);

    if (e.currentTarget.files != null) {
      if (e.currentTarget.files[0].size <= 1048576 * 12) {
        setFiles(e.currentTarget.files[0]);
      } else {
        alert('this file too big !!');
      }
      console.log('File');

      // formData.append('file', e.currentTarget.files[0]);
    }
  };

  const handleCover = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files);

    if (e.currentTarget.files != null) {
      setCover(e.currentTarget.files[0]);

      console.log('Cover');

      // formData.append('file', e.currentTarget.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !(
        tosendSubjectId &&
        tosendSubjectName &&
        teacherNameRef.current?.value &&
        tosendExam &&
        tosendYear &&
        decriptionRef.current?.value &&
        tosendSubjectName &&
        files
      )
    ) {
      alert('Form is invalid');
      return;
    }

    formData.append('subjectId', tosendSubjectId);
    formData.append('subjectName', tosendSubjectName);
    formData.append('teachers', teacherNameRef.current?.value || '');
    formData.append('exam', tosendExam);
    formData.append('year', tosendYear);
    formData.append('description', decriptionRef.current?.value || '');
    formData.append('sharenoteCollectionName', tosendSubjectName);
    formData.append('files', files as File);
    formData.append('files', Cover as File);

    console.log('formData = ', formData);

    // Display FormData
    // for (var pair of formData.entries()) {
    //   console.log('x: ', pair[0] + ', ' + pair[1]);
    // }

    setLoading(true);
    sendForm(formData);
    setTosendSubjectId('');
  };
  const sendForm = async (form: any) => {
    try {
      const res = await axiosInstance.post('/sharenote/uploads', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      if (res.data == 400) {
        alert('invalid');
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
    alert('Post done');
  };

  const loadSubjects = async () => {
    const res = await axiosInstance.get('/subject');
    setSubjects(res.data);
  };

  const selectSubject = (id: string, name: string) => {
    setTosendSubjectId(id);
    setTosendSubjectName(name);
    setShowSubjects(false);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setShowSubjects(true);
    setTosendSubjectId(e.currentTarget.value);
    if (e.currentTarget.value.length == 8) {
      subjects.forEach((subject) => {
        if (e.currentTarget.value == subject.subjectId) {
          setTosendSubjectName(subject.name);
        }
      });
    } else {
      setTosendSubjectName('');
    }
  };

  // Component
  const SubjectMenu: React.FC = () => {
    return (
      <div className='box'>
        {subjects.map((subject) => {
          if (
            subject.subjectId.startsWith(tosendSubjectId) &&
            0 < tosendSubjectId.length &&
            tosendSubjectId.length < 8
          ) {
            return (
              <div
                className='subject-menu'
                key={subjects.indexOf(subject)}
                onClick={() => selectSubject(subject.subjectId, subject.name)}
              >{`${subject.subjectId} ${subject.name}`}</div>
            );
          }
        })}
      </div>
    );
  };

  //Data from DDSL =========
  const [tosendExam, setTosendExam] = useState<string>('Exam');
  const [tosendYear, setTosendYear] = useState<string>('Year');
  const updateState = (state: string): void => {
    if (!isNaN(Number(state))) {
      setTosendYear(state);
    } else {
      if (state === 'Year') {
        setTosendYear(state);
      } else {
        setTosendExam(state);
      }
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // Loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className='sharenote-page'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='title'>
          <img src={temp} className='test' alt='' />
        </div>
        <div className='contain1'>
          <p>Subject ID</p>
          <input
            type='text'
            name='subjectId'
            autoComplete='off'
            onChange={handleInputChange}
            value={`${tosendSubjectId}`}
          />
          {showSubjects && <SubjectMenu />}
        </div>
        <div className='contain1'>
          <p>Teacher Name</p>
          <input type='text' ref={teacherNameRef} />
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
        <div className='contain1'>
          <p>Description</p>
          <textarea ref={decriptionRef}></textarea>
        </div>
        <div className='file-contain'>
          <p>File</p>
          <input
            type='file'
            id='file'
            accept='application/pdf'
            onChange={(e) => {
              handleFile(e);
            }}
          />
        </div>
        <div className='file-contain'>
          <p>Cover Image (Optional)</p>
          <input
            type='file'
            id='file'
            onChange={(e) => {
              handleCover(e);
            }}
          />
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
