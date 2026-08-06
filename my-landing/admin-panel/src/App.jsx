import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HeroEditor from './pages/HeroEditor';
import PricingEditor from './pages/PricingEditor';
import FeaturedEditor from './pages/FeaturedEditor';
import AboutEditor from './pages/AboutEditor';
import TestimonialsEditor from './pages/TestimonialsEditor';
import FAQEditor from './pages/FAQEditor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="pricing" element={<PricingEditor />} />
          <Route path="featured" element={<FeaturedEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="testimonials" element={<TestimonialsEditor />} />
          <Route path="faq" element={<FAQEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
