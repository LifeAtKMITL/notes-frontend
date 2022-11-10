import NoteCard from 'components/notecard';
import React, { useEffect, useState } from 'react';
import brand from 'assets/images/brand.png';
import 'pages/FindNotes/index.scss';
import { TbArrowsSort } from 'react-icons/tb';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import DropdownSelect from 'components/dropdown-select';
import axios from 'axios';

//fake resource
import temp from 'assets/test-resource/temp2.jpeg';
import temp2 from 'assets/test-resource/secret.jpg';

const data: any = [
  {
    subjectID: 'string',
    subjectName: 'string',
    teacherName: 'string',
    exam: 'Final',
    year: '2022',
    description: 'string',
    authImage: 'string',
    authName: 'string',
    authID: 'string',
    noteView: 1,
    noteLike: 2,
  },
  {
    subjectID: 'string',
    subjectName: 'string',
    teacherName: 'string',
    exam: 'Midterm',
    year: '2020',
    description: 'string',
    authImage: 'string',
    authName: 'string',
    authID: 'string',
    noteView: 1,
    noteLike: 7,
  },
];

interface INote {
  subjectID: string;
  subjectName: string;
  teacherName: string;
  exam: string;
  year: string;
  description: string;
  file?: File;
  authImage: string;
  authName: string;
  authID: string;
  noteView: number;
  noteLike: number;
}
interface IProp {
  Notes: Array<INote>;
}

const FindNotesPage = () => {
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState<INote[]>(data);
  const [Notes, setNotes] = useState<INote[]>([]);
  // const loadMyNotes = async () => {
  //   const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/';
  //   const res = await axios.get(path);
  //   console.log(res.data);
  //   setNotes(res.data);
  // };
  const Title = () => {
    return (
      <div className='title'>
        <img src={brand} />
        <h2>Find Note</h2>
        <p>
          Sharing your notes? <a onClick={() => navigate('/share-notes')}>click here</a>
        </p>
      </div>
    );
  };

  const SearchEngine = () => {};

  const SorterButton = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const handleSort = (prop: string) => {
      setIsSorting(false);
      setSortBy(prop);
    };

    return (
      <div className='sorter-container'>
        <button className='sorter-button' onClick={() => setIsSorting(!isSorting)}>
          <h3>{sortBy}</h3>
          <TbArrowsSort className='icon' size={15} />
        </button>
        <div className={`sorter-menu ${isSorting ? 'active' : 'inactive'}`}>
          <div className='menu' onClick={() => handleSort('sort')}>
            Default
          </div>
          <div className='menu' onClick={() => handleSort('Like')}>
            Most Like
          </div>
          <div className='menu' onClick={() => handleSort('View')}>
            Most View
          </div>
        </div>
      </div>
    );
  };

  const GenerateNotes: React.FC<IProp> = ({ Notes }) => {
    return (
      <div className='notes-container'>
        {Notes.map((note: INote) => {
          return (
            <NoteCard
              subjectName={note.subjectName}
              examination={note.exam}
              academicYear={note.year}
              teacherName={note.teacherName}
              userName={note.authName}
              userPic={note.authImage}
              notePic={''}
              noteLike={note.noteLike}
              noteView={note.noteView}
              key={Notes.indexOf(note)}
            />
          );
        })}
      </div>
    );
  };
  const [searchExam, setSearchExam] = useState<string>('Exam');
  const [searchYear, setSearchYear] = useState<string>('Year');
  const [sortBy, setSortBy] = useState<string>('sort');

  const updateState = (state: string): void => {
    if (!isNaN(Number(state))) {
      setSearchYear(state);
    } else {
      if (state === 'Year') {
        setSearchYear(state);
      } else {
        setSearchExam(state);
      }
    }
  };

  useEffect(() => {
    let temp: INote[] = [];
    let filtExam = '';
    let filtYear = '';
    allNotes.forEach((ele) => {
      if (searchExam != 'Exam') {
        filtExam = searchExam;
      }
      if (searchYear != 'Year') {
        filtYear = searchYear;
      }
      if (ele.year.includes(filtYear) && ele.exam.includes(filtExam)) {
        temp.push(ele);
      }
      setNotes(temp);
    });
  }, [searchExam, searchYear]);

  return (
    <div className='findNote'>
      <Title />
      <div className='search'>
        <div className='search-box'>
          <input type='text' />
          <button className='button-search'>
            <IoSearchOutline size={15} />
          </button>
        </div>
        <DropdownSelect lst={['Midterm', 'Final']} defaultVal='Exam' updateState={updateState} />
        <DropdownSelect
          lst={Array.from({ length: 10 }, (v, k) => (new Date().getFullYear() - k).toString())}
          defaultVal='Year'
          updateState={updateState}
        />
      </div>
      <SorterButton />
      <GenerateNotes Notes={Notes} />
      <button
        onClick={() => {
          console.log(sortBy, searchExam, searchYear, Notes);
        }}
      >
        Click
      </button>
    </div>
  );
};

export default FindNotesPage;
