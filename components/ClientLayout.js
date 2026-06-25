'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import CourseEnrollmentModal from './CourseEnrollmentModal';

// Create context for enrollment modal
const EnrollmentModalContext = createContext();

export const useEnrollmentModal = () => {
  const context = useContext(EnrollmentModalContext);
  if (!context) {
    throw new Error('useEnrollmentModal must be used within ClientLayout');
  }
  return context;
};

// Navigations where BOTH the origin and destination share this prefix
// skip the loading fade entirely — content switches instantly.
const SILENT_PREFIXES = ['/services'];

function isSilentTransition(from, to) {
  return SILENT_PREFIXES.some(
    (prefix) => from?.startsWith(prefix) && to?.startsWith(prefix)
  );
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const openEnrollmentModal = (course = '') => {
    setSelectedCourse(course);
    setIsEnrollmentModalOpen(true);
  };

  const closeEnrollmentModal = () => {
    setIsEnrollmentModalOpen(false);
  };

  useEffect(() => {
    const prevPath = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    // Skip the opacity fade for silent transitions (e.g. /services/* ↔ /services/*)
    // so content appears instantly without a blank screen.
    if (isSilentTransition(prevPath, pathname)) {
      setIsLoading(false);
      return;
    }

    // Set loading state on route change
    setIsLoading(true);

    // Determine duration based on route
    const basePath = pathname?.split('/').slice(0, 2).join('/') || '/';
    const isHomePage = basePath === '/';
    const loadDuration = isHomePage ? 3200 : 1900;

    // Match the preloader duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadDuration);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <EnrollmentModalContext.Provider value={{ openEnrollmentModal, closeEnrollmentModal }}>
      <div style={{ 
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
        visibility: isLoading ? 'hidden' : 'visible'
      }}>
        {children}
      </div>
      
      {/* Global Enrollment Modal */}
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={closeEnrollmentModal}
        selectedCourse={selectedCourse}
      />
    </EnrollmentModalContext.Provider>
  );
}
