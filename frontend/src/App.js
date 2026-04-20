import "@/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import { ScrollToTop } from "./components/ScrollToTop";

// Pages principales
import Home from "./pages/Home";
import PourquoiNous from "./pages/PourquoiNous";
import ValeursProgramme from "./pages/ValeursProgramme";
import CommentVoter from "./pages/CommentVoter";
import Equipe from "./pages/Equipe";
import EngagementsFAQ from "./pages/EngagementsFAQ";
import CandidatePage from "./pages/CandidatePage";

// Pages utilitaires
import Soutenir from "./pages/Soutenir";
import SoutenirMerci from "./pages/SoutenirMerci";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import Admin from "./pages/Admin";

function App() {
  return (
    <HelmetProvider>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
          },
        }}
      />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Pages principales */}
          <Route path="/" element={<Home />} />
          <Route path="/pourquoi-nous" element={<PourquoiNous />} />
          <Route path="/valeurs-programme" element={<ValeursProgramme />} />
          <Route path="/comment-voter" element={<CommentVoter />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/equipe/:slug" element={<CandidatePage />} />
          <Route path="/engagements-faq" element={<EngagementsFAQ />} />

          {/* Pages utilitaires */}
          <Route path="/soutenir" element={<Soutenir />} />
          <Route path="/soutenir/merci" element={<SoutenirMerci />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/admin" element={<Admin />} />

          {/* Redirections 301 (anciennes URLs → nouvelles) */}
          <Route path="/programme" element={<Navigate to="/valeurs-programme" replace />} />
          <Route path="/liste" element={<Navigate to="/equipe" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
