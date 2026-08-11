import { NavLink } from "react-router-dom";

function Sidebar() {

    const active = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 rounded ${isActive
            ? "bg-[#8582FF] text-white"
            : "hover:bg-[#8582FF] hover:text-white transition-colors"
        }`;

    return (



        <nav className="fixed left-0 top-0 h-full w-[var(--sidebar-width)] bg-surface border-r border-outline-variant flex flex-col py-6 z-50 md:flex">
            <div className="px-6 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <div>
                    <h1 className="font-headline-md text-headline-md font-bold text-primary">AI Manager</h1>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Enterprise Suite</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-2 px-2">
                <NavLink to="/" className={active}>
                    <span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                </NavLink>
                <NavLink to="/content-library" className={active}>
                    <span className="material-symbols-outlined">folder_special</span>
                    Content Library
                </NavLink>
                <NavLink to="/ai-analyzer" className={active}>
                    <span className="material-symbols-outlined">psychology</span>
                    AI Analyzer
                </NavLink>
                <NavLink to="/trend-explorer" className={active}>
                    <span className="material-symbols-outlined">explore</span>
                    Trend Explorer
                </NavLink>
                <NavLink to="/scheduler" className={active}>
                    <span className="material-symbols-outlined">calendar_today</span>
                    Scheduler
                </NavLink>
                <NavLink to="/analytics" className={active}>
                    <span className="material-symbols-outlined">insights</span>
                    Analytics
                </NavLink>
                <NavLink to="/socialaccounts" className={active}>
                    <span className="material-symbols-outlined">hub</span>
                    Social Accounts
                </NavLink>
                <NavLink to="/settings" className={active}>
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </NavLink>
            </div>

            <div className="px-6 mt-auto flex flex-col gap-4">
                <button className="w-full py-2 px-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors">Upgrade Storage</button>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant pt-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                        <span>AI Agent Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">cloud_queue</span>
                        <span>Storage: 85%</span>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Sidebar;