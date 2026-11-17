import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SiteLayout } from "@/layouts/SiteLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Suspense
        fallback={
          <div
            className="flex min-h-screen items-center justify-center bg-ink"
            role="status"
            aria-live="polite"
          >
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-brand-violet" />
          </div>
        }
      >
        <Routes>
          {/* Studio admin — outside the marketing layout on purpose. */}
          <Route path="admin" element={<AdminPage />} />
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-and-conditions" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
