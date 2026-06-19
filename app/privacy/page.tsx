import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Fraud Alert Network",
  description: "Our privacy policy explains how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-semibold mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-10">Last updated: June 2026</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Fraud Alert Network ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our scam reporting platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="mb-4">When you submit a scam report, we collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Website or scammer details</li>
              <li>Description of the scam</li>
              <li>Scam category</li>
              <li>Submission timestamp</li>
              <li>IP address (for security purposes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information you provide to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Create and maintain scam reports in our database</li>
              <li>Help other users identify and avoid scams</li>
              <li>Detect patterns in fraudulent activity</li>
              <li>Improve our platform and services</li>
              <li>Prevent duplicate or spam reports</li>
              <li>Investigate and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Public Visibility</h2>
            <p>
              Reports submitted to Fraud Alert Network are displayed publicly to help protect the community. Your name may be displayed as "Anonymous" or your chosen name along with the scam details, phone number, website, and description. Please do not include sensitive personal information you do not want publicly visible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Storage & Security</h2>
            <p className="mb-4">
              Your data is stored securely in Supabase, a secure cloud database. We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure database access controls</li>
              <li>Regular security audits</li>
              <li>Protected API endpoints</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p>
              Reports are retained indefinitely to maintain a searchable database of known scams. This helps protect future victims. You may request deletion of your report by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. However, we may share aggregated, anonymized data for research and anti-fraud initiatives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. GDPR & Your Rights</h2>
            <p className="mb-4">If you are in the EU, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <p>
              For privacy-related questions or to exercise your rights, please contact us at:{" "}
              <a href="mailto:privacy@fraudalertnetwork.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                privacy@fraudalertnetwork.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Policy Changes</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by updating the date at the top of this page.
            </p>
          </section>

          <div className="mt-12 p-6 rounded-lg border border-blue-300 bg-blue-50">
            <p className="text-blue-900 font-semibold">
              By submitting a report, you acknowledge that you have read and agree to this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
