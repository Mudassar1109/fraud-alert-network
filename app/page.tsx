export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">
          Fraud Alert Network
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mb-10">
          Search phone numbers, emails, websites and scam reports.
          Help protect people from online fraud worldwide.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search phone number, email or website..."
            className="flex-1 p-4 rounded-lg text-black"
          />

          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold">
            Search
          </button>
        </div>

        <div className="mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold">
            Report a Scammer
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Latest Scam Reports
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3 className="font-bold">Fake WhatsApp Prize</h3>
            <p className="text-gray-400 mt-2">
              Reported by community members.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3 className="font-bold">Investment Scam</h3>
            <p className="text-gray-400 mt-2">
              Multiple victims reported losses.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3 className="font-bold">Fake Job Offer</h3>
            <p className="text-gray-400 mt-2">
              Fraudulent recruitment campaign.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Network Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl text-center">
            <h3 className="text-4xl font-bold">0</h3>
            <p className="text-gray-400">Scam Reports</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl text-center">
            <h3 className="text-4xl font-bold">0</h3>
            <p className="text-gray-400">Scam Numbers</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl text-center">
            <h3 className="text-4xl font-bold">0</h3>
            <p className="text-gray-400">Protected Users</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-8 text-center text-gray-400">
        © 2026 Fraud Alert Network. All Rights Reserved.
      </footer>
    </main>
  );
}