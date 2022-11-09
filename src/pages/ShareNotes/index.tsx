import React, { useEffect, useState } from 'react';
import 'pages/ShareNotes/index.scss';
import DropdownSelect from 'components/dropdown-select';
import axios from 'axios';

interface ISubject {
  subjectId: string;
  name: string;
}
interface Iprop {
  subjects: Array<ISubject>;
}

const ShareNotesPage = () => {
  const handleSubmit = () => {
    return;
  };
  const handleChange = () => {
    return;
  };

  //Data to fill subjectID =>  subjectName
  const [showSubjects, setShowSubjects] = useState<boolean>(false);
  const [tosentSubjectId, setTosentSubjectId] = useState<string>('');
  const [tosentSubjectName, setTosentSubjectName] = useState<string>('');

  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const loadSubjects = async () => {
    const res = await axios.get('https://life-at-kmitl-backend-production.up.railway.app/subject');
    setSubjects(res.data);
  };

  const selectSubject = (id: string, name: string) => {
    setTosentSubjectId(id);
    setTosentSubjectName(name);
    setShowSubjects(false);
  };

  const handleInputChange = (e: React.FormEvent<HTMLElement>) => {
    setShowSubjects(true);
  };

  const SubjectMenu: React.FC = () => {
    useEffect(() => {
      let handler = () => {
        setShowSubjects(false);
      };

      document.addEventListener('mousedown', handler);
    });

    return (
      <div className='box'>
        {subjects.map((subject) => {
          if (subject.subjectId[0] == '9') {
            return (
              <div
                className='subject-menu'
                key={subjects.indexOf(subject)}
                onClick={() => selectSubject(subject.subjectId, subject.name)}
              >{`${subject.subjectId}${subject.name}`}</div>
            );
          }
        })}
      </div>
    );
  };

  //Data from DDSL =========
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

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <div className='sharenote-page'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='title'>
          <h2>New Note</h2>
        </div>
        <div className='contain1'>
          <p>Subject ID</p>
          <input type='text' name='subjectId' onChange={handleInputChange} />
          {showSubjects && <SubjectMenu />}
        </div>
        <div className='contain1'>
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
        <div className='contain1'>
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
      <button
        onClick={() => {
          console.log(tosentSubjectId, tosentSubjectName);
        }}
      >
        Click
      </button>
    </div>
  );
};

export default ShareNotesPage;
