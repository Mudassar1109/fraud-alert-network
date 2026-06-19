import Link from "next/link";

export const metadata = {
  title: "FAQ | Fraud Alert Network",
  description: "Frequently asked questions about Fraud Alert Network.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Fraud Alert Network?",
      answer:
        "Fraud Alert Network is a community-driven platform where users report suspected scams, frauds, and phishing attempts. Our goal is to help protect people from becoming victims of fraud by sharing information about known scams.",
    },
    {
      question: "How do I submit a report?",
      answer:
        "Go to the homepage and fill out the 'Report a Scam' form with details about the scam, including the phone number, website, email, scam type, and description. After submitting, the report will be added to our public database.",
    },
    {
      question: "Is my information kept private?",
      answer:
        "Your submitted report is publicly visible to help warn others. Your name may be displayed as you provide it or as 'Anonymous' if you choose. Your email address is used for contact purposes only and is not publicly displayed.",
    },
    {
      question: "Can I delete my report?",
      answer:
        "You can request deletion of your report by contacting us at privacy@fraudalertnetwork.com. We will review your request and comply with applicable laws.",
    },
    {
      question: "What if I believe a report is false?",
      answer:
        "If you believe a report is inaccurate or false, please contact us immediately at abuse@fraudalertnetwork.com with details. We investigate such claims and remove false reports.",
    },
    {
      question: "Is this platform affiliated with law enforcement?",
      answer:
        "Fraud Alert Network is an independent platform. While we are not affiliated with law enforcement, we encourage users to report scams to their local police, the FBI's IC3, or relevant regulatory agencies.",
    },
    {
      question: "Can I use this information for legal action?",
      answer:
        "Reports on this platform are provided for informational purposes only and should not be considered as legal evidence. For legal matters, consult with an attorney and provide reports to appropriate authorities.",
    },
    {
      question: "How are reports moderated?",
      answer:
        "We have automated and manual review processes to detect spam, false reports, and violations. However, we cannot guarantee that all reports meet our standards due to volume.",
    },
    {
      question: "What happens if I submit a false report?",
      answer:
        "Submitting false reports is prohibited. You may face removal from the platform, legal action for defamation, and criminal charges if applicable.",
    },
    {
      question: "How often is the database updated?",
      answer:
        "Reports are added to our database immediately after submission (pending review). Users can search and filter reports in real-time.",
    },
    {
      question: "Can I search for specific scammers?",
      answer:
        "Yes! You can search by phone number, email, website, scam type, or description using the search bar on the homepage.",
    },
    {
      question: "What should I do if I'm a victim of fraud?",
      answer:
        "1. Document everything (screenshots, communications, transactions). 2. Contact your bank or financial institution immediately. 3. File a report with local law enforcement. 4. Report to the FBI's Internet Crime Complaint Center (IC3) at ic3.gov. 5. Report to the FTC at reportfraud.ftc.gov. 6. Consider reporting to Fraud Alert Network to warn others.",
    },
    {
      question: "Is Fraud Alert Network safe to use?",
      answer:
        "Yes, we use HTTPS encryption, secure database storage, and implement security best practices. However, like any online platform, be cautious about the information you share.",
    },
    {
      question: "How is my data protected?",
      answer:
        "Your data is stored in Supabase with enterprise-grade security. We implement encryption, access controls, and regular security audits. See our Privacy Policy for more details.",
    },
    {
      question: "Can I report anonymously?",
      answer:
        "Yes! You can use 'Anonymous' or a pseudonym as your reporter name. However, you must provide a valid email and phone number for contact purposes.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-semibold mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 mb-10">Find answers to common questions about Fraud Alert Network</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-400 hover:shadow-md transition"
            >
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-900">
                {faq.question}
                <span className="text-blue-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg border border-blue-300 bg-blue-50">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Didn't find your answer?</h2>
          <p className="text-blue-800 mb-4">
            Contact our support team for additional assistance:
          </p>
          <div className="space-y-2 text-blue-900">
            <p>
              📧 General inquiries:{" "}
              <a href="mailto:support@fraudalertnetwork.com" className="font-semibold hover:text-blue-700">
                support@fraudalertnetwork.com
              </a>
            </p>
            <p>
              🔒 Privacy concerns:{" "}
              <a href="mailto:privacy@fraudalertnetwork.com" className="font-semibold hover:text-blue-700">
                privacy@fraudalertnetwork.com
              </a>
            </p>
            <p>
              ⚠️ Report abuse:{" "}
              <a href="mailto:abuse@fraudalertnetwork.com" className="font-semibold hover:text-blue-700">
                abuse@fraudalertnetwork.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3 text-center text-sm text-gray-600">
          <p>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
              Privacy Policy
            </Link>
            {" • "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">
              Terms of Service
            </Link>
            {" • "}
            <Link href="/disclaimer" className="text-blue-600 hover:text-blue-700 font-semibold">
              Disclaimer
            </Link>
            {" • "}
            <Link href="/community-guidelines" className="text-blue-600 hover:text-blue-700 font-semibold">
              Community Guidelines
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
