import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] md:p-10">
        <header className="mb-8 border-b border-outline-variant pb-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">Privacy</p>
          <h1 className="text-3xl font-bold text-on-surface md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-on-surface-variant">Effective Date: August 12, 2026</p>
        </header>

        <div className="space-y-8 text-on-surface">
          <p className="text-base leading-7 text-on-surface-variant">
            At Ai Socials, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application and connected services.
          </p>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">1. Information We Collect</h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-medium text-on-surface">A. Account & Authentication Information</h3>
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
                  <li><span className="font-semibold text-on-surface">Direct Account Data:</span> Name, email address, password, and payment information when you register for an account.</li>
                  <li><span className="font-semibold text-on-surface">Third-Party Credentials (TikTok):</span> When you authenticate via TikTok Login Kit, we receive your basic public profile information, including your Open ID, display name, and avatar URL.</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-on-surface">B. Authorization Tokens</h3>
                <p className="text-base leading-7 text-on-surface-variant">
                  We securely store OAuth access tokens and refresh tokens required to interact with third-party APIs such as TikTok’s Content Posting API on your behalf.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-on-surface">C. User Content & Media</h3>
                <p className="text-base leading-7 text-on-surface-variant">
                  Videos, images, titles, captions, hashtags, and scheduling preferences uploaded or generated through our platform for publishing.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">2. How We Use Your Information</h2>
            <p className="mb-3 text-base leading-7 text-on-surface-variant">We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li>Provide, operate, and maintain the Ai Socials management platform.</li>
              <li>Authenticate your account and enable third-party platform integrations.</li>
              <li>Publish video content directly to your connected TikTok account upon your authorization.</li>
              <li>Analyze video requirements such as duration, resolution, and privacy options to ensure proper API posting formatting.</li>
              <li>Improve, personalize, and expand our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">3. Data Storage & Security</h2>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li><span className="font-semibold text-on-surface">Server-Side Security:</span> All sensitive credentials, including TikTok Client Secrets, OAuth Access Tokens, and Refresh Tokens, are encrypted and stored exclusively on secure backend servers. They are never exposed client-side or shared with third parties.</li>
              <li><span className="font-semibold text-on-surface">Data Retention:</span> We retain your account data and API tokens only for as long as your account is active or as necessary to provide services. You can revoke access at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">4. Third-Party Services & TikTok Integration</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              Ai Socials utilizes official APIs provided by third-party platforms, including TikTok. By connecting your TikTok account:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li>You grant Ai Socials permission to post content to your account according to your direct settings and schedules.</li>
              <li>Your use of TikTok features is governed by TikTok’s Privacy Policy.</li>
              <li>You can manage or revoke Ai Socials’ access to your TikTok account at any time via your TikTok Security Settings under “Authorized Apps.”</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">5. Sharing of Information</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              We do not sell, trade, or rent your personal data to third parties. We only share information with third-party service providers such as cloud hosting, media storage, or database providers solely to operate our service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">6. Your Rights & Data Deletion</h2>
            <p className="mb-3 text-base leading-7 text-on-surface-variant">You have the right to:</p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li>Access, update, or delete the personal information we hold about you.</li>
              <li>Disconnect your social media accounts from Ai Socials at any time.</li>
              <li>Request complete deletion of your account and associated tokens by contacting us at support@yourdomain.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">7. Changes to This Privacy Policy</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated Effective Date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">8. Contact Us</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              If you have questions regarding this Privacy Policy, please contact us at:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li>Email: support@yourdomain.com</li>
              <li>Website: https://yourdomain.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
