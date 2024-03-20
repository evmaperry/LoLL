import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import TopNav from './components/TopNav';
import Home from './components/Home';
import Invasives from './components/Invasives';
import Mission from './components/Mission';
import Shoreline from './components/Shoreline';
import GetInvolved from './components/GetInvolved';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path='/'
        element={
          <>
            <TopNav />
            <Home />
          </>
        }
      />
      <Route
        path='/invasives'
        element={
          <>
            <TopNav />
            <Invasives />
          </>
        }
      />
      <Route
        path='/mission'
        element={
          <>
            <TopNav />
            <Mission />
          </>
        }
      />
      <Route
        path='/shoreline'
        element={
          <>
            <TopNav />
            <Shoreline />
          </>
        }
      />
      <Route
        path='/getinvolved'
        element={
          <>
            <TopNav />
            <GetInvolved />
          </>
        }
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
