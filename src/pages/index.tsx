import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Popup from "~/components/createBaseUI";
import DeletePopup from "~/components/deletepopup";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession();
  const user = session.data?.user;

  const [showPopup, setShowPopup] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedBaseId, setSelectedBaseId] = useState<string>("");
  const [selectedBaseName, setSelectedBaseName] = useState<string>("");

  const handleDeletePopupToggle = (baseId: string, baseName: string) => {
    setSelectedBaseId(baseId);
    setSelectedBaseName(baseName);
    setDeletePopupVisible(true);
  };

  const { data: bases, isLoading, error } = api.base.getAllBaseIds.useQuery();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-sm w-full mx-4 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h12M3 18h8" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Airtable Clone</h1>
          <p className="text-slate-500 mb-8 text-sm">Organize anything, together.</p>
          <button
            onClick={() => void signIn()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Sign in with Discord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-slate-900 text-lg">Airtable Clone</span>
          <div className="flex items-center gap-3">
            {user.image && (
              <img src={user.image} alt={user.name ?? ""} className="w-8 h-8 rounded-full" />
            )}
            <span className="text-sm text-slate-600">{user.name}</span>
            <button
              onClick={() => void signOut()}
              className="text-sm text-slate-400 hover:text-slate-700 transition-colors ml-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Your Bases</h2>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            + New Base
          </button>
        </div>

        {isLoading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">Error loading bases.</p>
        ) : !bases?.length ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-base">No bases yet.</p>
            <p className="text-sm mt-1">Click &ldquo;+ New Base&rdquo; to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bases.map((base) => (
              <div
                key={base.baseId}
                className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <Link href={`/${base.baseId}`} className="block p-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h12M3 18h8" />
                    </svg>
                  </div>
                  <p className="font-medium text-slate-800 truncate">{base.baseName}</p>
                </Link>
                <div className="px-5 pb-4 border-t border-slate-100 pt-3">
                  <button
                    onClick={() => handleDeletePopupToggle(base.baseId, base.baseName)}
                    className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <DeletePopup
        isVisible={isDeletePopupVisible}
        onClose={() => setDeletePopupVisible(false)}
        baseId={selectedBaseId}
        baseName={selectedBaseName}
      />
    </div>
  );
}
