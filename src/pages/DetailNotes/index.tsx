import DetailNote from 'components/detail-note';
import React, { useContext } from 'react';
import { userContext } from 'App';
import { useSearchParams } from 'react-router-dom';

interface IDetailNote {
  id: string;
  subjectName: string;
  teacher: string;
  exam: string;
  year: string;
  description: string;
  username: string;
  views: number;
  likes: number;
  pic: string;
  pdf: string;
  likeArr: string[];
}

interface Icopy {
  [key: string]: any;
}

const DetailNotesPage = () => {
  const context = useContext(userContext);
  const likedArr = context.likedNotes;

  let collect = {} as Icopy;
  let tempToken = '';
  const [searchParams] = useSearchParams();
  for (const entry of searchParams.entries()) {
    let [param, value] = entry;
    if (param === 'token') {
      tempToken = value;
      break;
    }
    if (param === 'pdf') {
      let temp = value.slice(0, 74);
      let sl = value.slice(74).replaceAll('/', '%2F').replaceAll(' ', '%20');
      collect[param] = temp + sl;
    } else {
      collect[param] = value;
    }
  }
  collect.pdf = collect.pdf + '&token=' + tempToken;
  collect.likeArr = likedArr;

  const collection = { ...collect } as IDetailNote;

  return <DetailNote />;
};

export default DetailNotesPage;
