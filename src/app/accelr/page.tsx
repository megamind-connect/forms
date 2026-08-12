"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function isWeekday(s: string) {
  if (!s) return false;
  const d = new Date(s + "T00:00:00").getDay();
  return d !== 0 && d !== 6;
}

const MARKETING_TOOLS = [
  { id: "meta", label: "Meta Ads" }, { id: "google", label: "Google Ads" },
  { id: "linkedin", label: "LinkedIn" }, { id: "tiktok", label: "TikTok Ads" },
  { id: "twitter", label: "X / Twitter" }, { id: "youtube", label: "YouTube Ads" },
  { id: "email", label: "Email Marketing" }, { id: "seo", label: "SEO / Content" },
  { id: "whatsapp", label: "WhatsApp" }, { id: "influencer", label: "Influencer" },
  { id: "none", label: "None Currently" },
];

const ISSUES = [
  "Low online visibility", "Poor lead quality", "High ad spend, low ROI",
  "Inconsistent content strategy", "No clear brand positioning", "Weak social media presence",
  "Low website conversion rate", "Difficulty scaling campaigns",
  "No marketing analytics", "Team lacks digital expertise",
];

const inp = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F43F46]/40 focus:border-[#F43F46] focus:bg-white transition-all shadow-sm shadow-gray-100/50";

function chip(sel: boolean, disabled = false) {
  return "px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 " +
    (sel ? "bg-gradient-to-r from-[#E31313] to-[#F43F46] border-transparent text-white shadow-md shadow-red-500/20 scale-[1.02]" :
     disabled ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed" :
     "bg-white border-gray-200 text-gray-600 hover:border-[#F43F46] hover:text-[#F43F46] hover:bg-red-50/50 cursor-pointer hover:shadow-sm");
}

/* Tightened Minimalist Section Wrapper */
function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-100/80 last:border-0 last:pb-0 last:mb-0">
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{title}</h3>
        {description && <p className="text-sm text-gray-400 mt-1.5 font-medium">{description}</p>}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default function AccelrForm() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [usesCRM, setUsesCRM]   = useState<"yes" | "no" | null>(null);
  const [tools, setTools]       = useState<string[]>([]);
  const [issues, setIssues]     = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]         = useState(false);
  const [doneName, setDoneName] = useState("");

  const fc = (k: string, v: any) => setFormData(p => ({ ...p, [k]: v }));

  const toggleTool = (id: string) => {
    if (id === "none") { setTools(["none"]); return; }
    setTools(p => { const f = p.filter(t => t !== "none"); return f.includes(id) ? f.filter(t => t !== id) : [...f, id]; });
  };
  const toggleIssue = (v: string) =>
    setIssues(p => p.includes(v) ? p.filter(i => i !== v) : p.length < 5 ? [...p, v] : p);

  // Generate tomorrow's date as minimum
  const minDate = (() => { 
    const d = new Date(); d.setDate(d.getDate() + 1); 
    while ([0,6].includes(d.getDay())) d.setDate(d.getDate() + 1); 
    return d.toISOString().split("T")[0]; 
  })();

  const submit = async () => {
    const req: [string, string][] = [["name","Name"],["business_name","Business Name"],["company_name","Company Name"],["phone","Phone"],["email","Email"]];
    for (const [k, l] of req) { if (!formData[k]?.trim()) { toast.error("Please fill in: " + l); return; } }
    if (usesCRM === null) { toast.error("Please indicate whether you use a CRM"); return; }
    if (tools.length === 0) { toast.error("Select at least one marketing platform"); return; }
    if (issues.length === 0 && !formData.issue_details?.trim()) { toast.error("Select or describe at least one challenge"); return; }
    if (!selectedDate) { toast.error("Please select a date for your strategy session"); return; }
    
    setSubmitting(true);
    try {
      await fetch("https://app.accelr.app/api/leads/capture", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingKey: "cmrbxdk1z000d11pitobab2t9",
          data: { name: formData.name, email: formData.email, phone: formData.phone, WEBSITE: "Accelr Lead Form",
            businessName: formData.business_name, companyName: formData.company_name, websiteUrl: formData.website_url || "",
            usesCRM, crmName: formData.crm_name || "", marketingTools: tools.join(", "),
            issuesFacing: issues.join(", "), issueDetails: formData.issue_details || "", preferredDates: selectedDate },
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setDoneName(formData.name || ""); setDone(true);
      setFormData({}); setTools([]); setIssues([]); setSelectedDate(""); setUsesCRM(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  };

  /* DONE SCREEN */
  if (done) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
      <style>{`@keyframes pop{0%{transform:scale(0.9);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes draw{to{stroke-dashoffset:0}}`}</style>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-10 md:p-14 max-w-lg w-full text-center relative z-10" style={{ animation: "pop 0.5s cubic-bezier(0.16,1,0.3,1) forwards" }}>
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#E31313] to-[#F43F46] flex items-center justify-center shadow-xl shadow-red-500/30 mb-8">
          <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
            <path d="M14 30 L26 42 L46 20" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="60" style={{ animation: "draw 0.6s ease 0.3s forwards" }} />
          </svg>
        </div>
        <p className="text-sm font-black tracking-widest uppercase text-[#F43F46] mb-3">Strategy Secured</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {doneName ? `You're set, ${doneName.split(" ")[0]}!` : "You're all set!"}
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          Our team is reviewing your profile. Expect a call within <span className="font-bold text-gray-800">24 hours</span> to confirm your slot.
        </p>
        <button onClick={() => setDone(false)} className="w-full py-4 rounded-xl font-bold text-white bg-gray-900 hover:bg-black transition-all">
          Return to form
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative selection:bg-red-500/30 selection:text-red-900 overflow-hidden font-sans">
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator { opacity:0.4; cursor:pointer; width: 24px; height: 24px; }
      `}</style>

      {/* --- BLENDED MEGA MIND LOGO OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden mix-blend-multiply opacity-[0.03]">
        <div className="relative w-[120vw] h-[120vh] max-w-[1200px] max-h-[1200px]">
          <Image src="/images/mmLogo.png" alt="" fill className="object-contain rotate-[-15deg] scale-150" priority />
        </div>
      </div>

      {/* --- GLOWING BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-red-400/20 to-transparent rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-orange-400/10 to-red-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-20">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 mb-8">
            <Image src="/images/mmLogo.png" alt="Megamind" width={130} height={34} className="object-contain" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-5">
            Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31313] to-[#F43F46]">growth roadmap.</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto">
            Answer a few quick questions to secure your 100% free, expert-led digital strategy session.
          </p>
        </div>

        {/* --- FORM CARD --- */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-6 sm:p-10 md:p-12">
          <form onSubmit={e => { e.preventDefault(); submit(); }}>
            
            <FormSection title="Your Details" description="Basic contact and business information.">
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inp} type="text" placeholder="Full Name *" value={formData.name || ""} onChange={e => fc("name", e.target.value)} />
                <input className={inp} type="text" placeholder="Business Name *" value={formData.business_name || ""} onChange={e => fc("business_name", e.target.value)} />
                <input className={inp} type="text" placeholder="Company Name *" value={formData.company_name || ""} onChange={e => fc("company_name", e.target.value)} />
                <input className={inp} type="url" placeholder="Website URL (Optional)" value={formData.website_url || ""} onChange={e => fc("website_url", e.target.value)} />
                <input className={inp} type="tel" placeholder="Phone Number *" value={formData.phone || ""} onChange={e => fc("phone", e.target.value)} />
                <input className={inp} type="email" placeholder="Email Address *" value={formData.email || ""} onChange={e => fc("email", e.target.value)} />
              </div>
            </FormSection>

            <FormSection title="CRM Usage" description="Do you currently manage your leads with a CRM tool?">
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* YES Card (No Icons) */}
                <label className={`group relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  usesCRM === "yes" 
                    ? "border-[#F43F46] bg-red-50/40 shadow-sm ring-1 ring-[#F43F46]/10" 
                    : "border-gray-200 bg-white hover:border-red-300 hover:bg-gray-50/50"
                }`}>
                  <input type="radio" name="crm" value="yes" className="hidden" onChange={() => setUsesCRM("yes")} />
                  
                  {/* Text */}
                  <div className="flex-1 pr-4">
                    <h4 className={`text-base font-bold mb-0.5 ${usesCRM === "yes" ? "text-[#E31313]" : "text-gray-900"}`}>Yes, I use a CRM</h4>
                    <p className="text-xs text-gray-500">HubSpot, Salesforce, etc.</p>
                  </div>

                  {/* Custom Radio Button */}
                  <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    usesCRM === "yes" ? "border-[#F43F46] bg-[#F43F46]" : "border-gray-300 bg-white group-hover:border-red-300"
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-white transition-transform duration-300 ${usesCRM === "yes" ? "scale-100" : "scale-0"}`} />
                  </div>
                </label>

                {/* NO Card (No Icons) */}
                <label className={`group relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  usesCRM === "no" 
                    ? "border-[#F43F46] bg-red-50/40 shadow-sm ring-1 ring-[#F43F46]/10" 
                    : "border-gray-200 bg-white hover:border-red-300 hover:bg-gray-50/50"
                }`}>
                  <input type="radio" name="crm" value="no" className="hidden" onChange={() => { setUsesCRM("no"); fc("crm_name", ""); }} />
                  
                  {/* Text */}
                  <div className="flex-1 pr-4">
                    <h4 className={`text-base font-bold mb-0.5 ${usesCRM === "no" ? "text-[#E31313]" : "text-gray-900"}`}>No, I don't</h4>
                    <p className="text-xs text-gray-500">I use spreadsheets or nothing.</p>
                  </div>

                  {/* Custom Radio Button */}
                  <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    usesCRM === "no" ? "border-[#F43F46] bg-[#F43F46]" : "border-gray-300 bg-white group-hover:border-red-300"
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-white transition-transform duration-300 ${usesCRM === "no" ? "scale-100" : "scale-0"}`} />
                  </div>
                </label>
              </div>

              {/* Reveal Input if YES (Smooth Grid Expansion) */}
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${usesCRM === "yes" ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                <div className="overflow-hidden">
                  <input className={inp} type="text" placeholder="Which CRM do you use? (e.g., HubSpot, Zoho, Salesforce)" value={formData.crm_name || ""} onChange={e => fc("crm_name", e.target.value)} />
                </div>
              </div>
            </FormSection>

            <FormSection title="Marketing Channels" description="Which platforms are you currently active on? Select all that apply.">
              <div className="flex flex-wrap gap-2.5">
                {MARKETING_TOOLS.map(t => (
                  <button key={t.id} type="button" onClick={() => toggleTool(t.id)} className={chip(tools.includes(t.id))}>
                    {t.label}
                  </button>
                ))}
              </div>
            </FormSection>

            <FormSection title="Core Challenges" description="Select up to 5 issues you are currently facing.">
              <div className="flex flex-wrap gap-2.5 mb-5">
                {ISSUES.map(issue => {
                  const sel = issues.includes(issue);
                  const dis = !sel && issues.length >= 5;
                  return (
                    <button key={issue} type="button" disabled={dis} onClick={() => toggleIssue(issue)} className={chip(sel, dis)}>
                      {issue}
                    </button>
                  );
                })}
              </div>
              <textarea rows={4} className={inp + " resize-none"} placeholder="Tell us a bit more about your situation (Optional)..." value={formData.issue_details || ""} onChange={e => fc("issue_details", e.target.value)} />
            </FormSection>

            <FormSection title="Select a Date" description="Choose a weekday (Mon-Fri) for your strategy call.">
              <div className="max-w-md relative">
                <input 
                  type="date" 
                  min={minDate} 
                  value={selectedDate} 
                  className={inp + " pl-14 cursor-pointer text-lg h-[64px]"}
                  onChange={e => {
                    const val = e.target.value;
                    if (!val) { setSelectedDate(""); return; }
                    if (!isWeekday(val)) { 
                      toast.error("Please pick a weekday (Mon to Fri)"); 
                      setSelectedDate(""); 
                      return; 
                    }
                    setSelectedDate(val);
                  }}
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </FormSection>

            {/* --- SUBMIT --- */}
            <div className="pt-4">
              <button type="submit" disabled={submitting}
                className="group relative w-full flex justify-center items-center gap-3 py-4 sm:py-5 rounded-2xl font-bold text-white text-lg sm:text-xl overflow-hidden transition-all hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #E31313, #F43F46)", boxShadow: "0 15px 35px -5px rgba(227,19,19,0.3)" }}>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>

                {submitting ? (
                  <>
                    <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Securing your slot...</span>
                  </>
                ) : (
                  <>
                    <span>Book My Free Strategy Session</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}