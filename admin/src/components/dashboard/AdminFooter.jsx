import React from 'react';

export default function AdminFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 px-6 md:px-10 border-t border-gray-100 bg-white/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500 font-medium">
                    © {currentYear} <span className="text-[#123499] font-bold">Smart Health Connect</span>. All rights reserved.
                </div>

                <div className="flex items-center gap-8">
                    <a href="/privacy-policy" className="text-xs text-gray-400 hover:text-[#123499] transition-colors font-semibold uppercase tracking-widest">Privacy Policy</a>
                    <a href="/security-policy" className="text-xs text-gray-400 hover:text-[#123499] transition-colors font-semibold uppercase tracking-widest">Security Policy</a>
                    <a href="#" className="text-xs text-gray-400 hover:text-[#123499] transition-colors font-semibold uppercase tracking-widest">Support</a>
                </div>
            </div>
        </footer>
    );
}
