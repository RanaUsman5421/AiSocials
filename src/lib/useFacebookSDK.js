import { useEffect } from 'react';

const APP_ID = import.meta.env.VITE_FB_APP_ID || '';

export function useFacebookSDK() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
      if (!window.FB) return;
      window.FB.init({
        appId: APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v26.0',
      });
    };
  }, []);
}

export default useFacebookSDK;
