import Link from "next/link";

export const metadata = {
  title: "Community Guidelines | Fraud Alert Network",
  description: "Guidelines for using Fraud Alert Network responsibly.",
};

export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-semibold mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Community Guidelines</h1>
        <p className="text-lg text-gray-600 mb-10">Help us maintain a trusted and safe platform for everyone</p>

        <div className="space-y-8">
          <section className="p-6 rounded-lg border border-blue-300 bg-blue-50">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Our Mission</h2>
            <p className="text-blue-800">
              Fraud Alert Network exists to protect the community from scammers and fraudsters by sharing verified reports of suspicious activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Do's</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Submit reports based on your personal experience with a scam</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Include specific details like phone numbers, websites, and email addresses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Provide a clear description of what happened</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Be respectful and professional in your submissions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Help other users by sharing your experience</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Report false or misleading content to us</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">Use this platform to warn others and prevent fraud</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">❌ Don'ts</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Submit false or unverified claims</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Share private information of innocent people</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Use this platform for harassment or cyberbullying</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Submit spam or commercial advertisements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Plagiarize or copy reports from other users</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Include hate speech, discrimination, or obscenities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Submit the same report multiple times</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-gray-700">Include irrelevant or off-topic information</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-blue-300 bg-blue-50">
                <h3 className="font-bold text-blue-900 mb-1">💬 WhatsApp Scam</h3>
                <p className="text-sm text-blue-700">Fraudulent messages or calls via WhatsApp</p>
              </div>
              <div className="p-4 rounded-lg border border-purple-300 bg-purple-50">
                <h3 className="font-bold text-purple-900 mb-1">💰 Investment Fraud</h3>
                <p className="text-sm text-purple-700">Schemes promising unrealistic returns on investments</p>
              </div>
              <div className="p-4 rounded-lg border border-cyan-300 bg-cyan-50">
                <h3 className="font-bold text-cyan-900 mb-1">🌐 Fake Website</h3>
                <p className="text-sm text-cyan-700">Counterfeit websites mimicking legitimate businesses</p>
              </div>
              <div className="p-4 rounded-lg border border-orange-300 bg-orange-50">
                <h3 className="font-bold text-orange-900 mb-1">🎣 Phishing</h3>
                <p className="text-sm text-orange-700">Attempts to steal login credentials or personal data</p>
              </div>
              <div className="p-4 rounded-lg border border-yellow-300 bg-yellow-50">
                <h3 className="font-bold text-yellow-900 mb-1">🪙 Crypto Scam</h3>
                <p className="text-sm text-yellow-700">Fraudulent cryptocurrency schemes or exchanges</p>
              </div>
              <div className="p-4 rounded-lg border border-indigo-300 bg-indigo-50">
                <h3 className="font-bold text-indigo-900 mb-1">💼 Job Scam</h3>
                <p className="text-sm text-indigo-700">Fake job offers or employment schemes</p>
              </div>
              <div className="p-4 rounded-lg border border-emerald-300 bg-emerald-50 sm:col-span-2">
                <h3 className="font-bold text-emerald-900 mb-1">🏦 Banking Fraud</h3>
                <p className="text-sm text-emerald-700">Fraudulent banking or payment scams</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consequences for Violations</h2>
            <p className="mb-4">Violations of these guidelines may result in:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Removal of offending reports</li>
              <li>Temporary suspension from submitting reports</li>
              <li>Permanent banning from the platform</li>
              <li>Legal action for defamation or other violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Moderation</h2>
            <p>
              Our team reviews reports for compliance with these guidelines. We reserve the right to remove, edit, or reject any report that violates these rules. However, due to the volume of reports, we cannot guarantee that all content meets these standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h2>
            <p>
              If you believe a report violates these guidelines, please contact us at:{" "}
              <a href="mailto:abuse@fraudalertnetwork.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                abuse@fraudalertnetwork.com
              </a>
            </p>
          </section>

          <div className="mt-12 p-6 rounded-lg border border-emerald-300 bg-emerald-50">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">Together, We Fight Fraud</h3>
            <p className="text-emerald-800">
              By following these guidelines, you help create a safer community for everyone. Thank you for your commitment to fighting scams and protecting others.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
