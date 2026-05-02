import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ListChecks, Clock, User } from 'lucide-react';

import Splash from './pages/Splash.jsx';
import Onboarding from './pages/Onboarding.jsx';
import WeeklyPlan from './pages/WeeklyPlan.jsx';
import Ingredients from './pages/Ingredients.jsx';
import History from './pages/History.jsx';
import Profile from './pages/Profile.jsx';
import MenuDetail from './pages/MenuDetail.jsx';
import GiveReaction from './pages/GiveReaction.jsx';
import HistoryDetail from './pages/HistoryDetail.jsx';
import UnrespondedMeals from './pages/UnrespondedMeals.jsx';

import './App.css';

// Main routes where bottom nav is visible
const MAIN_ROUTES = ['/rencana', '/bahan', '/riwayat', '/profil'];

function BottomNav() {
  const { pathname } = useLocation();
  const isMainRoute = MAIN_ROUTES.some((r) => pathname === r);
  if (!isMainRoute) return null;

  return (
    <nav className="bottom-nav">
      <NavLink to="/rencana" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} id="nav-rencana">
        <UtensilsCrossed size={22} />
        <span>Rencana</span>
        <div className="nav-dot" />
      </NavLink>
      <NavLink to="/bahan" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} id="nav-bahan">
        <ListChecks size={22} />
        <span>Bahan</span>
        <div className="nav-dot" />
      </NavLink>
      <NavLink to="/riwayat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} id="nav-riwayat">
        <Clock size={22} />
        <span>Riwayat</span>
        <div className="nav-dot" />
      </NavLink>
      <NavLink to="/profil" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} id="nav-profil">
        <User size={22} />
        <span>Profil</span>
        <div className="nav-dot" />
      </NavLink>
    </nav>
  );
}

export default function App() {
  const [appState, setAppState] = useState('splash'); // splash | onboarding | main
  const [babyProfile, setBabyProfile] = useState(null);
  const [weekPlan, setWeekPlan] = useState(null);

  if (appState === 'splash') {
    return (
      <div className="app-shell">
        <Splash onDone={() => setAppState('onboarding')} />
      </div>
    );
  }

  if (appState === 'onboarding') {
    return (
      <div className="app-shell">
        <Onboarding
          onComplete={(profile) => {
            setBabyProfile(profile);
            setAppState('main');
          }}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/rencana" replace />} />
          <Route path="/rencana" element={<WeeklyPlan baby={babyProfile} weekPlan={weekPlan} setWeekPlan={setWeekPlan} />} />
          <Route path="/rencana/detail/:id" element={<MenuDetail baby={babyProfile} />} />
          <Route path="/bahan" element={<Ingredients baby={babyProfile} weekPlan={weekPlan} />} />
          <Route path="/riwayat" element={<History baby={babyProfile} weekPlan={weekPlan} />} />
          <Route path="/riwayat/belum-respon" element={<UnrespondedMeals baby={babyProfile} weekPlan={weekPlan} />} />
          <Route path="/riwayat/detail/:id" element={<HistoryDetail />} />
          <Route path="/respon/:menuId/:meal" element={<GiveReaction />} />
          <Route path="/profil" element={<Profile baby={babyProfile} onUpdate={setBabyProfile} />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
