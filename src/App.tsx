import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/slicknav.min.css';
import './assets/css/swiper-bundle.min.css';
import './assets/css/animate.css';
import './assets/css/custom.css';
import './assets/css/mobile-fix.css'; // Emergency mobile navigation fix
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Loading from './components/Loading';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Incubation = React.lazy(() => import('./pages/Incubation/Incubation'));
const TrainingWorkshops = React.lazy(() => import('./pages/TrainingWorkshops/TrainingWorkshops'));
const InnovationAcceleration = React.lazy(() => import('./pages/Innovation/Innovation'));
const HowToApply = React.lazy(() => import('./pages/HowToApply/HowToApply'));
const Resources = React.lazy(() => import('./pages/Resource/Resources'));
const MediaGallery = React.lazy(() => import('./pages/MediaGallery/MediaGallery'));
const DigitalGallery = React.lazy(() => import('./pages/DigitalGallery/DigitalGallery'));
const NewsEvents = React.lazy(() => import('./pages/NewsEvents/NewsEvents'));
const FAQsPage = React.lazy(() => import('./pages/FAQs/FAQsPage'));
const Policy = React.lazy(() => import('./pages/Policy/Policy'));
const BusinessTools = React.lazy(() => import('./pages/BusinessTools/BusinessTools'));
const Zones = React.lazy(() => import('./pages/Investment/Zones'));
const StepsToInvest = React.lazy(() => import('./pages/Invest/StepsToInvest'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const LeadershipTeam = React.lazy(() => import('./pages/leadership/LeadershipTeam'));
const Board = React.lazy(() => import('./pages/Board/Board'));
const CareerPage = React.lazy(() => import('./pages/Career/Career'));
const StatusCheck = React.lazy(() => import('./pages/Career/StatusCheck'));
const LeasedLandPage = React.lazy(() => import('./pages/Space/LeasedLandPage'));
const OfficePage = React.lazy(() => import('./pages/office/OfficePage'));
const WhoWeAre = React.lazy(() => import('./pages/WhoWeAre/WhoWeAre'));
const About = React.lazy(() => import('./pages/About/AboutUs'));
const PartnersInvestors = React.lazy(() => import('./pages/investors/PartnersInvestors'));
const ITNetworkSupport = React.lazy(() => import('./pages/Services/ITNetworkSupport'));
const SoftwareConsulting = React.lazy(() => import('./pages/Services/SoftwareConsulting'));
const CloudInfrastructure = React.lazy(() => import('./pages/Services/cloudInfrastructure'));
const LiveEventsPage = React.lazy(() => import('./pages/LiveEvents'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const InvestorLanding = React.lazy(() => import('./pages/InvestorLanding/InvestorLanding'));
const VerifyEmployeePage = React.lazy(() => import('./pages/Verify/VerifyEmployeePage'));

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.cursor = 'auto';

    // Emergency fix: Ensure touch events work on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Ensure all links are clickable
      const style = document.createElement('style');
      style.textContent = `
        a, button, [role="button"] {
          pointer-events: auto !important;
          touch-action: manipulation !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Services > IT Services */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/network" element={<ITNetworkSupport />} />
            <Route path="/services/software-consulting" element={<SoftwareConsulting />} />
            <Route path="/it-cloud/cloud-infrastructure" element={<CloudInfrastructure />} />

            {/* Services > Spaces */}

            {/* Investment */}
            <Route path="/investment" element={<Zones />} />
            <Route path="/investment/zones" element={<Zones />} />
            <Route path="/investment/steps-to-invest" element={<StepsToInvest />} />

            {/* Incubation */}
            <Route path="/incubation" element={<Incubation />} />


            {/* Incubation > Programs */}
            <Route path="/incubation/training" element={<TrainingWorkshops />} />
            <Route path="/incubation/innovation-programs" element={<InnovationAcceleration />} />
            <Route path="/incubation/how-to-apply" element={<HowToApply />} />

            {/* Resources */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/digital" element={<DigitalGallery />} />
            <Route path="/resources/digital/gallery" element={<MediaGallery />} />
            <Route path="/resources/digital/news" element={<NewsEvents />} />
            <Route path="/resources/digital/news/:type" element={<NewsEvents />} />
            <Route path="/resources/digital/news/:type/:id" element={<NewsEvents />} />
            <Route path="/resources/policy" element={<Policy />} />
            <Route path="/resources/faqs" element={<FAQsPage />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about/leadership" element={<LeadershipTeam />} />
            <Route path="/about/board" element={<Board />} />
            <Route path="/about/who-we-are" element={<WhoWeAre />} />
            <Route path="/about/mission-vision" element={<About />} />
            <Route path="/about/partners" element={<PartnersInvestors />} />

            {/* Templates */}
            <Route path="/career" element={<CareerPage />} />
            <Route path="/career/jobs" element={<CareerPage />} />
            <Route path="/career/status" element={<StatusCheck />} />

            <Route path="/services/spaces/leased-Land" element={<LeasedLandPage />} />
            <Route path="/services/spaces/office-Rent" element={<OfficePage />} />


            {/* Trends */}


            <Route path="/live-events" element={<LiveEventsPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/ceo-card" element={<InvestorLanding />} />
            <Route path="/verify-id/:idNumber" element={<VerifyEmployeePage />} />

            {/* Add more routes here as needed */}
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export default App;