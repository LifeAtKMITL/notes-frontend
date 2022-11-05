import NoteCard from 'components/notecard';
import React from 'react';
import brand from 'assets/images/brand.png';
import 'pages/FindNotes/index.scss';
import { TbArrowsSort } from 'react-icons/tb';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';

import temp from 'assets/test-resource/temp2.jpeg';
import temp2 from 'assets/test-resource/secret.jpg';
import { useNavigate } from 'react-router-dom';
import DropdownSelect from 'components/dropdown-select';
import axios from 'axios';

interface INote {
  subjectName: string;
  examination: string;
  academicYear: string;
  teacherName: string;
  userName: string;
  userPic: string;
  notePic: string;
  noteLike: number;
  noteDownload: number;
}

const FindNotesPage = () => {
  const navigate = useNavigate();

  const loadMyNotes = async () => {
    const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/';
    const res = await axios.get(path);
    console.log(res.data);
  };

  return (
    <div className='findNote'>
      <div className='title'>
        <img src={brand} />
        <h2>Find Note</h2>
        <p>
          Sharing your notes? <a onClick={() => navigate('/share-notes')}>click here</a>
        </p>
      </div>
      <div className='search'>
        <div className='search-box'>
          <input type='text' />
          <button className='button-search'>
            <IoSearchOutline size={15} />
          </button>
        </div>
        <DropdownSelect lst={['Midterm', 'Final']} defaultVal='Exam' />
        <DropdownSelect lst={Array.from({ length: 10 }, (v, k) => (2023 - (k + 1)).toString())} defaultVal='Year' />
      </div>

      <div className='sorter'>
        <button>
          <h3>sort</h3>
          <TbArrowsSort className='icon' size={15} />
        </button>
      </div>

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
          noteDownload={71}
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
          noteDownload={71}
        />
      </div>
    </div>
  );
};

export default FindNotesPage;
