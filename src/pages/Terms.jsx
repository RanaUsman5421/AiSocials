import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] md:p-10">
        <header className="mb-8 border-b border-outline-variant pb-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">Legal</p>
          <h1 className="text-3xl font-bold text-on-surface md:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-on-surface-variant">Effective Date: August 12, 2026</p>
        </header>

        <div className="space-y-8 text-on-surface">
          <p className="text-base leading-7 text-on-surface-variant">
            Welcome to Ai Socials. By accessing or using our website and application, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
          </p>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">1. Account Registration & Security</h2>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li>You must be at least 18 years old or the legal age of majority in your jurisdiction to use Ai Socials.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">2. Description of Service</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              Ai Socials provides an AI-powered social media management tool that allows users to schedule, optimize, generate captions for, and publish original video content to connected social media platforms, including TikTok.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">3. Third-Party Integrations (TikTok API)</h2>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li><span className="font-semibold text-on-surface">Account Authorization:</span> To use our publishing features, you must authorize Ai Socials via official third-party OAuth protocols such as TikTok Login Kit.</li>
              <li><span className="font-semibold text-on-surface">Compliance with Platform Rules:</span> You agree to abide by the terms and community guidelines of all connected platforms, including the TikTok Terms of Service and Community Guidelines.</li>
              <li><span className="font-semibold text-on-surface">Content Responsibility:</span> Ai Socials is a management tool. You retain full responsibility for all content, videos, captions, and hashtags published to your social media accounts through our service.</li>
              <li><span className="font-semibold text-on-surface">Prohibited Content:</span> You may not use Ai Socials to post spam, unauthorized promotional links, copyrighted materials without permission, watermarked unauthorized third-party content, or content that violates any applicable laws or platform policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">4. Intellectual Property & Content Ownership</h2>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li><span className="font-semibold text-on-surface">Your Content:</span> You retain all ownership rights to the original videos, audio, text, and media you upload or publish through Ai Socials.</li>
              <li><span className="font-semibold text-on-surface">Our Platform:</span> The Ai Socials software, interface, design, trademarks, and code are the exclusive property of Ai Socials.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">5. Limitation of Liability</h2>
            <p className="mb-3 text-base leading-7 text-on-surface-variant">
              To the maximum extent permitted by law, Ai Socials shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, arising out of:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-on-surface-variant">
              <li>Your use of or inability to use the service.</li>
              <li>Third-party platform downtime, API changes, or account restrictions imposed by platforms such as TikTok.</li>
              <li>Unauthorized access to or loss of your content or data.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">6. Termination</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              We reserve the right to suspend or terminate your access to Ai Socials at our sole discretion, without notice, if you violate these Terms or engage in conduct that harms our service, users, or third-party platform partners.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">7. Changes to Terms</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              We reserve the right to modify these Terms at any time. Continued use of the platform after changes take effect constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-on-surface">8. Contact Information</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              For any questions concerning these Terms, please contact us at:
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

export default Terms;
