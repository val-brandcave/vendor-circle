"use client";

import { useEffect, useRef } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

// Type declaration for Shepherd Tour
type ShepherdTour = InstanceType<typeof Shepherd.Tour>;

export interface TourStep {
  id: string;
  attachTo?: { element: string; on: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' };
  title: string;
  text: string | string[];
  buttons?: any[];
  classes?: string;
  when?: {
    show?: () => void;
    hide?: () => void;
  };
}

interface GuidedTourProps {
  tourId: string;
  steps: TourStep[];
  autoStart?: boolean;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function GuidedTour({ 
  tourId, 
  steps, 
  autoStart = false,
  onComplete,
  onCancel 
}: GuidedTourProps) {
  const tourRef = useRef<ShepherdTour | null>(null);

  useEffect(() => {
    // Check if this tour has been completed before
    const tourCompleted = localStorage.getItem(`tour-completed-${tourId}`);
    if (tourCompleted === 'true') {
      return; // Don't show tour if already completed
    }

    // Create tour instance
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true,
        },
      },
    });

    // Add steps
    steps.forEach((step) => {
      tour.addStep({
        id: step.id,
        title: step.title,
        text: Array.isArray(step.text) ? step.text.join('<br><br>') : step.text,
        attachTo: step.attachTo,
        classes: step.classes || '',
        buttons: step.buttons || [
          {
            text: 'Skip',
            classes: 'shepherd-button-secondary',
            action: tour.cancel,
          },
          {
            text: 'Next',
            classes: 'shepherd-button-primary',
            action: tour.next,
          },
        ],
        when: step.when,
      });
    });

    // Tour event handlers
    tour.on('complete', () => {
      localStorage.setItem(`tour-completed-${tourId}`, 'true');
      if (onComplete) onComplete();
    });

    tour.on('cancel', () => {
      localStorage.setItem(`tour-completed-${tourId}`, 'true');
      if (onCancel) onCancel();
    });

    tourRef.current = tour;

    // Auto-start if enabled
    if (autoStart) {
      // Small delay to ensure DOM is ready
      setTimeout(() => tour.start(), 500);
    }

    return () => {
      if (tourRef.current) {
        tourRef.current.complete();
      }
    };
  }, [tourId, autoStart, onComplete, onCancel]);

  return null; // This component doesn't render anything
}

// Helper function to manually start a tour
export function startTour(tourId: string) {
  // Remove completion flag to allow re-showing
  localStorage.removeItem(`tour-completed-${tourId}`);
  // Trigger a page reload or tour restart
  window.location.reload();
}

// Helper function to reset all tours
export function resetAllTours() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('tour-completed-')) {
      localStorage.removeItem(key);
    }
  });
}
