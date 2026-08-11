import React from 'react'

const Navbar = () => {
  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-[var(--topbar-height)] bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant shadow-sm flex justify-between items-center px-4 md:px-8 z-40">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="font-headline-md text-headline-md text-on-surface hidden md:block">Workspace Alpha</div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
        <input className="w-full bg-surface-container border border-outline-variant rounded-full py-2 pl-10 pr-4 text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.2)] transition-all font-body-sm text-body-sm outline-none" placeholder="AI Search..." type="text" />
      </div>

      <div className="flex items-center gap-6">
        <span className="text-on-surface-variant font-label-md text-label-md hidden md:block">Credits: 450</span>
        <button className="text-on-surface-variant hover:text-primary transition-colors hover:scale-105 hidden md:block">Theme</button>
        <button className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] hidden md:block">Logout</button>
        <div className="flex items-center gap-3">
          <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">notifications</span></button>
          <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">account_circle</span></button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
