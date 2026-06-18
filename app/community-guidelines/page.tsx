import Link from "next/link";

export const metadata = {
  title: "Community Guidelines | Fraud Alert Network",
  description: "Guidelines for using Fraud Alert Network responsibly.",
};

export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-300 hover:text-red-100 transition mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">Community Guidelines</h1>
        <p className="text-slate-400 mb-10">Help us maintain a trusted and safe platform for everyone</p>

        <div className="space-y-8 text-slate-300">
          <section className="p-6 rounded-lg border border-blue-500/30 bg-blue-500/10">
            <h2 className="text-2xl font-bold text-blue-200 mb-2">Our Mission</h2>
            <p>
              Fraud Alert Network exists to protect the community from scammers and fraudsters by sharing verified reports of suspicious activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">✅ Do's</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Submit reports based on your personal experience with a scam</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Include specific details like phone numbers, websites, and email addresses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Provide a clear description of what happened</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Be respectful and professional in your submissions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Help other users by sharing your experience</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Report false or misleading content to us</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Use this platform to warn others and prevent fraud</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">❌ Don'ts</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Submit false or unverified claims</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Share private information of innocent people</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Use this platform for harassment or cyberbullying</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Submit spam or commercial advertisements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Plagiarize or copy reports from other users</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Include hate speech, discrimination, or obscenities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Submit the same report multiple times</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✕</span>
                <span>Include irrelevant or off-topic information</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Report Categories</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">WhatsApp Scam</h3>
                <p className="text-sm">Fraudulent messages or calls via WhatsApp</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">Investment Fraud</h3>
                <p className="text-sm">Schemes promising unrealistic returns on investments</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">Fake Website</h3>
                <p className="text-sm">Counterfeit websites mimicking legitimate businesses</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">Phishing</h3>
                <p className="text-sm">Attempts to steal login credentials or personal data</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">Crypto Scam</h3>
                <p className="text-sm">Fraudulent cryptocurrency schemes or exchanges</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">Job Scam</h3>
                <p className="text-sm">Fake job offers or employment schemes</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
                <h3 className="font-semibold text-red-300 mb-2">Banking Fraud</h3>
                <p className="text-sm">Fraudulent banking or payment scams</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Consequences for Violations</h2>
            <p className="mb-4">Violations of these guidelines may result in:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Removal of offending reports</li>
              <li>Temporary suspension from submitting reports</li>
              <li>Permanent banning from the platform</li>
              <li>Legal action for defamation or other violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Report Moderation</h2>
            <p>
              Our team reviews reports for compliance with these guidelines. We reserve the right to remove, edit, or reject any report that violates these rules. However, due to the volume of reports, we cannot guarantee that all content meets these standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
            <p>
              If you believe a report violates these guidelines, please contact us at:{" "}
              <a href="mailto:abuse@fraudalertnetwork.com" className="text-red-300 hover:text-red-100">
                abuse@fraudalertnetwork.com
              </a>
            </p>
          </section>

          <div className="mt-12 p-6 rounded-lg border border-green-500/30 bg-green-500/10">
            <h3 className="text-lg font-semibold text-green-200 mb-2">Together, We Fight Fraud</h3>
            <p className="text-green-100">
              By following these guidelines, you help create a safer community for everyone. Thank you for your commitment to fighting scams and protecting others.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
