import Link from "next/link";

export const metadata = {
  title: "Disclaimer | Fraud Alert Network",
  description: "Important disclaimer about using Fraud Alert Network.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-semibold mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Disclaimer</h1>

        <div className="space-y-8">
          <section className="p-6 rounded-lg border-2 border-amber-400 bg-amber-50">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">⚠️ Important Disclaimer</h2>
            <p className="text-amber-800 font-semibold">
              Fraud Alert Network is a community-driven platform where users report suspected scams. Reports are submitted by community members and may not be verified. Use this information at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Professional Advice</h2>
            <p>
              Information on Fraud Alert Network should not be considered as professional legal, financial, or security advice. If you believe you are a victim of fraud, please contact:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Your local law enforcement agency</li>
              <li>The FBI's Internet Crime Complaint Center (IC3)</li>
              <li>Your bank or financial institution</li>
              <li>The FTC (Federal Trade Commission)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Accuracy</h2>
            <p>
              While we strive for accuracy, reports are submitted by users and may contain:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Unverified information</li>
              <li>False or misleading content</li>
              <li>Personal opinions rather than facts</li>
              <li>Outdated information</li>
            </ul>
            <p className="mt-4">
              We recommend cross-referencing multiple sources before taking action based on reports.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guarantee of Accuracy</h2>
            <p>
              Fraud Alert Network makes no warranty or guarantee regarding the accuracy, completeness, or reliability of any information on this platform. Use this platform at your own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
            <p>
              All reports on this platform are third-party content submitted by users. We are not responsible for the accuracy, legality, or appropriateness of user-submitted content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Fraud Alert Network shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">False Report Consequences</h2>
            <p>
              Submitting false reports may result in:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Removal from the platform</li>
              <li>Legal action for defamation</li>
              <li>Criminal charges if applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify Before Acting</h2>
            <p>
              Before taking any action based on reports found on this platform, we strongly recommend:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Verifying information through official sources</li>
              <li>Checking with relevant government agencies</li>
              <li>Consulting with professionals</li>
              <li>Conducting independent research</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Availability</h2>
            <p>
              Fraud Alert Network is provided on an "as-is" basis. We do not guarantee continuous availability or that the platform will be free from errors or interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time. Your continued use of the platform constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report a False Report</h2>
            <p>
              If you believe a report is false or defamatory, please contact us immediately at:{" "}
              <a href="mailto:abuse@fraudalertnetwork.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                abuse@fraudalertnetwork.com
              </a>
            </p>
          </section>

          <div className="mt-12 p-6 rounded-lg border-2 border-amber-400 bg-amber-50">
            <p className="text-amber-900 font-semibold">
              By using Fraud Alert Network, you acknowledge that you have read this disclaimer and understand the risks involved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
