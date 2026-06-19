import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Fraud Alert Network",
  description: "Our terms of service outline the rules for using the Fraud Alert Network platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-semibold mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-10">Last updated: June 2026</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By using Fraud Alert Network, you agree to comply with these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Responsibility</h2>
            <p className="mb-4">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Providing accurate and truthful information in reports</li>
              <li>Not submitting false or misleading information</li>
              <li>Not harassing or defaming individuals</li>
              <li>Not submitting personal information of others without consent</li>
              <li>Not using the platform to spam or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prohibited Content</h2>
            <p className="mb-4">You may not submit reports that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Are false, misleading, or defamatory</li>
              <li>Contain hate speech or discriminatory language</li>
              <li>Include personal information of individuals without consent</li>
              <li>Promote illegal activities</li>
              <li>Contain malware or malicious code</li>
              <li>Violate intellectual property rights</li>
              <li>Are spam or commercial solicitations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Report Authenticity</h2>
            <p>
              You certify that all information in your report is accurate and truthful to the best of your knowledge. Submitting false reports may result in legal action and removal from the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p>
              Fraud Alert Network and its content are protected by copyright. You may not reproduce, modify, or distribute content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p>
              Fraud Alert Network is provided "as is" without warranties. We are not liable for damages resulting from use of this platform. Reports are for informational purposes only and do not constitute legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Indemnification</h2>
            <p>
              You agree to indemnify and hold Fraud Alert Network harmless from any claims, damages, or expenses arising from your use of the platform or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Rate Limiting & Abuse Prevention</h2>
            <p>
              We limit report submissions to prevent spam and abuse. Excessive submissions may result in temporary or permanent account restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
            <p>
              Any disputes shall be resolved through binding arbitration in accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modification of Terms</h2>
            <p>
              We reserve the right to modify these terms. Continued use constitutes acceptance of changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
            <p>
              For questions about these terms, contact us at:{" "}
              <a href="mailto:legal@fraudalertnetwork.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                legal@fraudalertnetwork.com
              </a>
            </p>
          </section>

          <div className="mt-12 p-6 rounded-lg border border-blue-300 bg-blue-50">
            <p className="text-blue-900 font-semibold">
              By submitting a report, you agree to these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
