import React, { useEffect, useRef, useState } from 'react';
import 'pages/ShareNotes/index.scss';
import DropdownSelect from 'components/dropdown-select';
import axios from 'axios';

interface ISubject {
  subjectId: string;
  name: string;
}

interface IForm {
  subjectID: string;
  subjectName: string;
  teacherName: string;
  exam: string;
  year: string;
  description: string;
  file?: File;
}

const ShareNotesPage = () => {
  // Form

  const teacherNameRef = useRef<HTMLInputElement>(null);
  const decriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let form: IForm = {
      subjectID: tosendSubjectId,
      subjectName: tosendSubjectName,
      teacherName: '',
      exam: tosendExam,
      year: tosendYear,
      description: '',
    };

    if (
      // form['subjectName'] != ' ' &&
      teacherNameRef.current != null &&
      form['exam'] != 'Exam' &&
      form['year'] != 'Year'
    ) {
      form['teacherName'] = teacherNameRef.current.value;
      if (decriptionRef.current != null) {
        form['description'] = decriptionRef.current.value;
      }
      console.log(form);
      // sendForm(form);
    } else {
      console.log('form invalid');
    }
  };

  const sendForm = async (form: IForm) => {
    try {
      const res = await axios.post('#', form);
    } catch (error: any) {
      console.log(error);
    }
  };

  //Data to fill subjectID =>  subjectName
  const [showSubjects, setShowSubjects] = useState<boolean>(false);
  const [tosendSubjectId, setTosendSubjectId] = useState<string>('');
  const [tosendSubjectName, setTosendSubjectName] = useState<string>('');

  const [subjects, setSubjects] = useState<ISubject[]>([]);

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

  const SubjectMenu: React.FC = () => {
    // useEffect(() => {
    //   let handler = () => {
    //     setShowSubjects(false);
    //   };

    //   document.addEventListener('mousedown', handler);
    // });

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

  // useEffect(() => {
  //   loadSubjects();
  //   console.log('ineffect');
  // }, []);

  console.log('rerender');

  return (
    <div className='sharenote-page'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='title'>
          <h2>New Note</h2>
        </div>
        <div className='contain1'>
          <p>Subject ID</p>
          <input type='text' name='subjectId' onChange={handleInputChange} value={`${tosendSubjectId}`} />
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
