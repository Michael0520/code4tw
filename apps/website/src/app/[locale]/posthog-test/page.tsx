'use client';

import {usePostHog} from '@/hooks/usePostHog';
import {useEffect, useState} from 'react';
import posthog from 'posthog-js';

export default function PostHogTestPage() {
  const {trackEvent, trackCTAClick} = usePostHog();
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [distinctId, setDistinctId] = useState<string>('');

  useEffect(() => {
    // Check if PostHog is initialized
    if (typeof window !== 'undefined' && posthog) {
      setIsInitialized(true);

      // Get session and user info
      const sid = posthog.get_session_id();
      const did = posthog.get_distinct_id();

      if (sid) setSessionId(sid);
      if (did) setDistinctId(did);

      // Track page view
      trackEvent('test_page_viewed', {
        test: true,
        timestamp: new Date().toISOString()
      });

      console.log('PostHog initialized with key:', process.env.NEXT_PUBLIC_POSTHOG_KEY?.substring(0, 10) + '...');
      console.log('PostHog session ID:', sid);
      console.log('PostHog distinct ID:', did);
    }
  }, [trackEvent]);

  const handleTestClick = () => {
    trackCTAClick('Test Button', 'posthog_test_page');
    alert('Event sent! Check your PostHog dashboard.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          PostHog Integration Test
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={isInitialized ? 'text-green-600' : 'text-red-600'}>
                {isInitialized ? 'PostHog Initialized' : 'PostHog Not Initialized'}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Configuration</h2>
            <div className="space-y-1 font-mono text-sm">
              <p>API Key: {process.env.NEXT_PUBLIC_POSTHOG_KEY?.substring(0, 10)}...</p>
              <p>Host: {process.env.NEXT_PUBLIC_POSTHOG_HOST}</p>
            </div>
          </div>

          {isInitialized && (
            <>
              <div>
                <h2 className="text-lg font-semibold mb-2">Session Info</h2>
                <div className="space-y-1 font-mono text-sm">
                  <p>Session ID: {sessionId || 'Loading...'}</p>
                  <p>Distinct ID: {distinctId || 'Loading...'}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Test Events</h2>
                <button
                  onClick={handleTestClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Test Event
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Click to send a test event to PostHog
                </p>
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Console Output</h2>
            <p className="text-sm text-gray-600">
              Open browser console (F12) to see PostHog initialization logs
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
            <a
              href="https://app.posthog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Open PostHog Dashboard →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}