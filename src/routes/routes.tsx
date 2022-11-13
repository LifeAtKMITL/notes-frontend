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
        path='/notes-detail'
        // path='/notes-detail/:subjectName/:exam/:year/:teacher/:userImage/:description/:file'
        element={<DetailNotesPage />}
      />
      <Route path='/share-notes' element={<ShareNotesPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Switch>
  );
};

export default Routes;
