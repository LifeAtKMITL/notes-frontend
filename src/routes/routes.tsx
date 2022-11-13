import DetailNotesPage from 'pages/DetailNotes';
import FindNotesPage from 'pages/FindNotes';
import HomePage from 'pages/Home';
import ProfilePage from 'pages/Profile';
import ShareNotesPage from 'pages/ShareNotes';
import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' element={<HomePage />} />
      <Route path='/find-notes' element={<FindNotesPage />} />
      <Route
        path='/notes-detail/:_id/:subjectName/:teachers/:exam/:year/:description/:username/:viewCount/:likeCount/:pic/:pdf'
        element={<DetailNotesPage />}
      />
      <Route path='/share-notes' element={<ShareNotesPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Switch>
  );
};

export default Routes;
