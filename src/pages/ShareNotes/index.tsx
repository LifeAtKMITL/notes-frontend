import React, { useEffect, useRef, useState } from 'react';
import 'pages/ShareNotes/index.scss';
import DropdownSelect from 'components/dropdown-select';
import { ISubject, IForm } from 'types/Form';
import axios from 'axios';

import temp from 'assets/images/newnote.png';
import Loading from 'components/loading';

const ShareNotesPage = () => {
  // var
  const teacherNameRef = useRef<HTMLInputElement>(null);
  const decriptionRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFiles] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [showSubjects, setShowSubjects] = useState<boolean>(false);
  const [tosendSubjectId, setTosendSubjectId] = useState<string>('');
  const [tosendSubjectName, setTosendSubjectName] = useState<string>('');
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  // temp var
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwZjk1NTdiMDlmMTI0N2U0ZGUyYmYzYjFjYjcyNjc5ZSIsImlhdCI6MTY2ODAwMTgyOSwiZXhwIjoxNjcwNTkzODI5fQ.hj-m3KVnEx6hwPjJGOqkAnBZIFocOB8B8Ey_j5uuoTA';

  // Function
  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files != null) {
      setFiles(e.currentTarget.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let form: IForm = {
      subjectId: tosendSubjectId,
      subjectName: tosendSubjectName,
      teachers: teacherNameRef.current?.value || '',
      exam: tosendExam,
      year: tosendYear,
      description: decriptionRef.current?.value || '',
      files: files,
      sharenoteCollectionName: tosendSubjectName,
    };

    if (
      !(
        form.teachers &&
        form.subjectName &&
        form.exam != 'Exam' &&
        form.year != 'Year' &&
        form.files &&
        form.description &&
        form.subjectId
      )
    ) {
      alert('Form is invalid  because some input is empty');
      return;
    }
    console.log(form);
    setLoading(true);
    sendForm(form);
    setTosendSubjectId('');
  };
  const sendForm = async (form: IForm) => {
    try {
      const res = await axios.post('https://life-at-kmitl-backend-production.up.railway.app/sharenote/uploads', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      setLoading(false);
      if (res.data == 400) {
        alert('invalid');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const loadSubjects = async () => {
    const res = await axios.get('https://life-at-kmitl-backend-production.up.railway.app/subject');
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
            onChange={(e) => {
              handleFile(e);
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
