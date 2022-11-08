import NoteCard from 'components/notecard';
import React, { useState } from 'react';
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
import data from 'assets/test-resource/data.json';

interface INote {
  subjectName: string;
  examination: string;
  academicYear: string;
  teacherName: string;
  userName: string;
  userPic: string;
  notePic: string;
  noteLike: number;
  noteView: number;
}

const FindNotesPage = () => {
  const navigate = useNavigate();

  // const loadMyNotes = async () => {
  //   const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/';
  //   const res = await axios.get(path);
  //   console.log(res.data);
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

    const [sortBy, setSortBy] = useState<string>('default');

    const handleSort = (prop: string) => {
      setIsSorting(false);
      setSortBy(prop);
    };

    return (
      <div className='sorter-container'>
        <button className='sorter-button' onClick={() => setIsSorting(!isSorting)}>
          <h3>sort</h3>
          <TbArrowsSort className='icon' size={15} />
        </button>
        <div className={`sorter-menu ${isSorting ? 'active' : 'inactive'}`}>
          <div className='menu' onClick={() => handleSort('default')}>
            Default
          </div>
          <div className='menu' onClick={() => handleSort('like')}>
            Most Like
          </div>
          <div className='menu' onClick={() => handleSort('view')}>
            Most View
          </div>
        </div>
      </div>
    );
  };

  const generateNoteCards = () => {};

  const [searchExam, setSearchExam] = useState<string>('Exam');
  const [searchYear, setSearchYear] = useState<string>('Year');

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

      <div className='notes-container'>
        <NoteCard
          subjectName='Software Architecture'
          examination='Final'
          academicYear='2022'
          teacherName='Parinya Ekparinya'
          userName='Yor Forger'
          userPic={temp2}
          notePic={temp}
          noteLike={53}
          noteView={71}
        />
        <NoteCard
          subjectName='Software Architecture'
          examination='Final'
          academicYear='2022'
          teacherName='Parinya Ekparinya'
          userName='Yor Forger'
          userPic={temp2}
          notePic={temp}
          noteLike={53}
          noteView={71}
        />
      </div>
    </div>
  );
};

export default FindNotesPage;
