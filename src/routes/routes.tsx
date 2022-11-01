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
      <Route path='/findnotes' element={<FindNotesPage />} />
      <Route path='/notesdetail' element={<DetailNotesPage />} />
      <Route path='/sharenotes' element={<ShareNotesPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Switch>
  );
};

export default Routes;
