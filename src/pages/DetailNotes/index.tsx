import DetailNote from 'components/detail-note';
import React, { useContext } from 'react';
import { userContext } from 'App';
import { useParams } from 'react-router-dom';

const DetailNotesPage = () => {
  const context = useContext(userContext);
  const likedArr = context.likedNotes;
  console.log(likedArr);
  let { _id, subjectName, teachers, exam, year, description, username, viewCount, likeCount, pdf, pic } = useParams();

  return <DetailNote />;
};

export default DetailNotesPage;
