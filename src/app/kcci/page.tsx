"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AuditLeadForm() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [dateMode, setDateMode] = useState<"suggested" | "custom">("suggested");
    const [suggestedDates, setSuggestedDates] = useState<{ label: string; value: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLinks, setSocialLinks] = useState<string[]>([""]);
    const [industryOpen, setIndustryOpen] = useState(false);
    const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [showThankYou, setShowThankYou] = useState(false);
    const [submittedName, setSubmittedName] = useState("");

    useEffect(() => {
        const dates: { label: string; value: string }[] = [];
        const base = new Date();
        base.setDate(base.getDate() + 10);
        for (let i = 0; i < 10; i++) {
            const d = new Date(base);
            d.setDate(base.getDate() + i);
            dates.push({
                label: d.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
                value: d.toISOString().split("T")[0],
            });
        }
        setSuggestedDates(dates);
    }, []);

    const handleChange = (name: string, value: any) =>
        setFormData((p) => ({ ...p, [name]: value }));

    const submitHandler = async () => {
        const required = [
            "name",
            "business_name",
            "number_of_employees",
            "industry",
            "whatsapp_number",
        ];
        // Validate at least one date slot is picked
        if (selectedDates.length === 0) {
            toast.error("Please suggest at least one date slot for the audit");
            return;
        }
        // Validate at least one problem is selected or described
        if (selectedProblems.length === 0 && (!formData.problem_facing || formData.problem_facing.trim() === "")) {
            toast.error("Please select or describe at least one problem you're facing");
            return;
        }
        // Validate at least one social link is filled
        if (!socialLinks.some((l) => l.trim() !== "")) {
            toast.error("Please add at least one Social Media link");
            return;
        }
        const labelMap: Record<string, string> = {
            name: "Name",
            business_name: "Business Name",
            number_of_employees: "Number of Employees",
            industry: "Industry",
            problem_facing: "Problem you're facing",
            website_link: "Website link",
            social_media: "Social Media",
            whatsapp_number: "WhatsApp Number",
            email: "Email Address",
        };
        const missing = required.find((k) => !formData[k] || formData[k] === "");
        if (missing) {
            toast.error(`Please fill: ${labelMap[missing]}`);
            return;
        }
        setIsSubmitting(true);
        try {
            const payload = { 
                ...formData, 
                social_media: socialLinks.filter(Boolean),
                selected_problems: selectedProblems,
                preferred_dates: selectedDates,
            };
            console.log("Audit Lead Payload:", payload);

            // Send to Accelr webhook
            await fetch("https://app.accelr.app/api/leads/capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    trackingKey: "cmrbxdk1z000d11pitobab2t9",
                    data: {
                        name: formData.name,
                        email: formData.email || "",
                        phone: formData.whatsapp_number,
                        WEBSITE: "KCCI Audit Lead Form",
                        businessName: formData.business_name,
                        numberOfEmployees: formData.number_of_employees,
                        industry: formData.industry,
                        problemFacing: formData.problem_facing || "",
                        selectedProblems: selectedProblems.join(", "),
                        websiteLink: formData.website_link || "",
                        socialMedia: socialLinks.filter(Boolean).join(", "),
                        presentationDate: selectedDates.join(", "),
                    },
                    pageUrl: typeof window !== "undefined" ? window.location.href : "",
                }),
            });

            setSubmittedName(formData.name || "");
            setShowThankYou(true);
            setFormData({});
            setSocialLinks([""]);
            setSelectedProblems([]);
            setSelectedDates([]);
            setDateMode("suggested");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const minDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 10);
        return d.toISOString().split("T")[0];
    })();

    const inputBase =
        "w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-[#F43F46]/40 focus:border-[#F43F46] transition-all";

    return (
        <div className="min-h-screen bg-[#F9F9F9]">

            {/* ── THANK YOU MODAL ── */}
            {showThankYou && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
                    onClick={() => setShowThankYou(false)}
                >
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full px-8 py-10 text-center"
                        style={{ animation: "modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <style>{`
                            @keyframes modalPop {
                                from { opacity: 0; transform: scale(0.85) translateY(24px); }
                                to   { opacity: 1; transform: scale(1) translateY(0); }
                            }
                            @keyframes checkDraw {
                                from { stroke-dashoffset: 60; }
                                to   { stroke-dashoffset: 0; }
                            }
                        `}</style>

                        {/* Close button */}
                        <button
                            onClick={() => setShowThankYou(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            aria-label="Close"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Animated check circle */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #E31313, #F43F46)" }}>
                                <svg width="36" height="36" viewBox="0 0 60 60" fill="none">
                                    <path
                                        d="M14 30 L26 42 L46 20"
                                        stroke="white"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeDasharray="60"
                                        style={{ animation: "checkDraw 0.5s ease 0.3s both" }}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Megamind wordmark */}
                        <p className="text-xs font-bold tracking-widest uppercase text-[#F43F46] mb-3">Megamind</p>

                        <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug">
                            Request Received{submittedName ? `, ${submittedName.split(" ")[0]}!` : "!"}
                        </h2>

                        <p className="text-gray-500 text-base leading-relaxed mb-2">
                            Your free business audit request has been successfully submitted.
                        </p>
                        <p className="text-gray-500 text-base leading-relaxed mb-8">
                            Our team will review your details and get back to you on your WhatsApp soon to confirm your audit slot.
                        </p>

                        {/* Divider with icon */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex-1 h-px bg-gray-100" />
                            {/* <span className="text-xl">🎉</span> */}
                            <div className="flex-1 h-px bg-gray-100" />
                        </div>

                        {/* What happens next */}
                        <div className="text-left space-y-3 mb-8">
                            {[
                                { step: "1", text: "Our team reviews your submission" },
                                { step: "2", text: "We contact you on WhatsApp to confirm your slot" },
                                { step: "3", text: "You receive your personalised business audit" },
                            ].map(({ step, text }) => (
                                <div key={step} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-[#E31313] text-xs font-bold flex items-center justify-center mt-0.5">{step}</span>
                                    <p className="text-sm text-gray-600">{text}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowThankYou(false)}
                            className="w-full py-3.5 rounded-2xl font-bold text-white text-base transition-all hover:shadow-lg"
                            style={{ background: "linear-gradient(135deg, #E31313, #F43F46)" }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}


            {/* ── NAV BAR ── */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Image
                        src="/images/mmLogo.png"
                        alt="Megamind Logo"
                        width={140}
                        height={36}
                        className="object-contain"
                    />
                    <span className="hidden md:block text-sm text-gray-500 font-medium">
                        Free Business Audit — Exclusive Offer
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-gray-500 font-medium">Limited Slots Available</span>
                    </div>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d0a0a] to-[#1a1a1a] px-6 pt-16 pb-28">
                <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F43F46]/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-[#F43F46]/10 blur-3xl" />
                {/* Ghosted Megamind Logo — decorative background */}
                <div className="pointer-events-none absolute right-[-60px] bottom-[-40px] opacity-[0.06] select-none">
                    <svg width="420" height="445" viewBox="0 0 101 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8264 0V31.3639L0 48.2741V107H84.1653V75.6444L101 58.7259V0H16.8264ZM33.6694 90.0815H16.8264V58.7259H33.6694V90.0815ZM33.6694 16.9185H50.5042V48.2741H33.6694V16.9185ZM67.3306 90.0815H50.5042V58.7259H67.3306V90.0815ZM84.1653 48.2741H67.3223V16.9185H84.1653V48.2741Z" fill="white"/>
                    </svg>
                </div>
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2  text-[#F43F46] text-xs font-bold uppercase tracking-widest  px-4 py-1.5 mb-6">
                            Exclusive Offer — Limited Slots
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                            Congratulations!
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-[#F43F46] mb-5">
                            You've Unlocked a Free Business Audit
                        </p>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                            Our experts will conduct a comprehensive audit of your business and present actionable insights tailored specifically to you. Fill in the form to claim your slot.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            {["100% Free", "Tailored Report", "Expert Insights"].map((tag) => (
                                <div key={tag} className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                    <svg className="w-4 h-4 text-[#F43F46] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                
                </div>
            </section>

            {/* ── FORM CARD ── */}
            <section className="relative -mt-10 pb-20 px-4 md:px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#E31313] via-[#F43F46] to-[#E31313]" />

                    <div className="px-8 md:px-14 pt-10 pb-14">
                        <div className="flex items-center gap-4 mb-10">
                            <svg width="36" height="38" viewBox="0 0 101 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8264 0V31.3639L0 48.2741V107H84.1653V75.6444L101 58.7259V0H16.8264ZM33.6694 90.0815H16.8264V58.7259H33.6694V90.0815ZM33.6694 16.9185H50.5042V48.2741H33.6694V16.9185ZM67.3306 90.0815H50.5042V58.7259H67.3306V90.0815ZM84.1653 48.2741H67.3223V16.9185H84.1653V48.2741Z" fill="#E31313"/>
                            </svg>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Megamind</p>
                                <h2 className="text-xl font-bold text-gray-800">Audit Registration Form</h2>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); submitHandler(); }} className="space-y-7">

                            {/* Row 1 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Name" required>
                                    <input type="text" className={inputBase} placeholder="Your full name"
                                        value={formData.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
                                </FormField>
                                <FormField label="Business Name" required>
                                    <input type="text" className={inputBase} placeholder="Your business name"
                                        value={formData.business_name || ""} onChange={(e) => handleChange("business_name", e.target.value)} />
                                </FormField>
                            </div>

                            {/* Row 2 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Number of Employees" required>
                                    <input type="text" className={inputBase} placeholder="e.g. 1–10, 11–50, 50+"
                                        value={formData.number_of_employees || ""} onChange={(e) => handleChange("number_of_employees", e.target.value)} />
                                </FormField>
                                <FormField label="Industry" required>
                                    <div className="relative">
                                        {/* Trigger button */}
                                        <button
                                            type="button"
                                            onClick={() => setIndustryOpen((o) => !o)}
                                            className={`${inputBase} flex items-center justify-between text-left ${
                                                formData.industry_select ? "text-gray-800" : "text-gray-400"
                                            }`}
                                        >
                                            <span>{formData.industry_select || "Select your industry"}</span>
                                            <svg
                                                className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                                                    industryOpen ? "rotate-180" : "rotate-0"
                                                }`}
                                                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Animated dropdown panel */}
                                        <div
                                            className={`absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
                                                industryOpen
                                                    ? "max-h-72 opacity-100 translate-y-0"
                                                    : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                                            }`}
                                            style={{ overflowY: industryOpen ? "auto" : "hidden" }}
                                        >
                                            <div className="py-2">
                                                {[
                                                    "Retail & E-Commerce",
                                                    "Technology & Software",
                                                    "Healthcare & Wellness",
                                                    "Finance & Banking",
                                                    "Real Estate",
                                                    "Education & Training",
                                                    "Food & Beverage",
                                                    "Manufacturing",
                                                    "Marketing & Advertising",
                                                    "Logistics & Supply Chain",
                                                    "Hospitality & Tourism",
                                                    "Construction & Engineering",
                                                    "Media & Entertainment",
                                                    "Legal & Compliance",
                                                    "Non-Profit & NGO",
                                                    "Other",
                                                ].map((opt) => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => {
                                                            handleChange("industry_select", opt);
                                                            if (opt !== "Other") handleChange("industry", opt);
                                                            else handleChange("industry", "");
                                                            setIndustryOpen(false);
                                                        }}
                                                        className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${
                                                            formData.industry_select === opt
                                                                ? "bg-[#F43F46]/10 text-[#E31313] font-semibold"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-[#F43F46]"
                                                        } ${
                                                            opt === "Other" ? "border-t border-gray-100 mt-1 pt-3" : ""
                                                        }`}
                                                    >
                                                        {formData.industry_select === opt && (
                                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F43F46] mr-2 mb-0.5" />
                                                        )}
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other free-form input */}
                                    {formData.industry_select === "Other" && (
                                        <input
                                            type="text"
                                            className={`${inputBase} mt-3`}
                                            placeholder="Please specify your industry…"
                                            value={formData.industry || ""}
                                            onChange={(e) => handleChange("industry", e.target.value)}
                                            autoFocus
                                        />
                                    )}
                                </FormField>
                            </div>

                            {/* Problem */}
                            <FormField
                                label="What problem are you facing?"
                                required
                                hint={selectedProblems.length === 3 ? "Maximum 3 selected" : "Select up to 3 that apply, then describe further below."}
                            >
                                {/* Suggested chips */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {[
                                        "Low sales / revenue",
                                        "Poor online visibility",
                                        "Inefficient operations",
                                        "High employee turnover",
                                        "Cash flow issues",
                                        "Weak brand presence",
                                        "No clear marketing strategy",
                                        "Customer retention problems",
                                        "Poor team communication",
                                        "Scaling challenges",
                                        "Outdated technology",
                                        "Lead generation issues",
                                    ].map((problem) => {
                                        const isSelected = selectedProblems.includes(problem);
                                        const isDisabled = !isSelected && selectedProblems.length >= 3;
                                        return (
                                            <button
                                                key={problem}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedProblems(selectedProblems.filter((p) => p !== problem));
                                                    } else if (selectedProblems.length < 3) {
                                                        setSelectedProblems([...selectedProblems, problem]);
                                                    }
                                                }}
                                                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                                    isSelected
                                                        ? "bg-[#F43F46] border-[#F43F46] text-white shadow-sm scale-105"
                                                        : isDisabled
                                                        ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
                                                        : "bg-white border-gray-200 text-gray-600 hover:border-[#F43F46] hover:text-[#F43F46] hover:bg-red-50 cursor-pointer"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <svg className="inline w-3 h-3 mr-1 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {problem}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Selected count badge */}
                                {selectedProblems.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-gray-100">
                                        <span className="text-xs text-gray-400 font-medium self-center">{selectedProblems.length}/3 selected:</span>
                                        {selectedProblems.map((p) => (
                                            <span key={p} className="inline-flex items-center gap-1 text-xs bg-red-50 text-[#E31313] border border-red-100 rounded-full px-3 py-1 font-semibold">
                                                {p}
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedProblems(selectedProblems.filter((x) => x !== p))}
                                                    className="hover:text-[#c90f0f] ml-0.5"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Free-form description */}
                                <textarea
                                    rows={3}
                                    className={`${inputBase} resize-none`}
                                    placeholder="Describe your problem in more detail (optional if you've selected above)…"
                                    value={formData.problem_facing || ""}
                                    onChange={(e) => handleChange("problem_facing", e.target.value)}
                                />
                            </FormField>

                            {/* Row 3 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Website Link">
                                    <input type="url" className={inputBase} placeholder="https://yourwebsite.com (optional)"
                                        value={formData.website_link || ""} onChange={(e) => handleChange("website_link", e.target.value)} />
                                </FormField>
                                <FormField label="Social Media Links" required hint="Add links to all your active profiles.">
                                    <div className="flex flex-col gap-3">
                                        {socialLinks.map((link, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <input
                                                    type="url"
                                                    className={inputBase}
                                                    placeholder={`https://instagram.com/yourhandle`}
                                                    value={link}
                                                    onChange={(e) => {
                                                        const updated = [...socialLinks];
                                                        updated[idx] = e.target.value;
                                                        setSocialLinks(updated);
                                                    }}
                                                />
                                                {socialLinks.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== idx))}
                                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-[#F43F46] border border-gray-200 transition-all"
                                                        title="Remove"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setSocialLinks([...socialLinks, ""])}
                                            className="self-start flex items-center gap-1.5 text-sm font-semibold text-[#F43F46] hover:text-[#c90f0f] transition-colors mt-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add another link
                                        </button>
                                    </div>
                                </FormField>
                            </div>

                            {/* Row 4 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="WhatsApp Number" required>
                                    <input type="tel" className={inputBase} placeholder="+91 99999 00000"
                                        value={formData.whatsapp_number || ""} onChange={(e) => handleChange("whatsapp_number", e.target.value)} />
                                </FormField>
                                <FormField label="Email Address">
                                    <input type="email" className={inputBase} placeholder="you@example.com (optional)"
                                        value={formData.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
                                </FormField>
                            </div>

                            {/* Presentation Date */}
                            <FormField
                                label="Date for Audit Presentation"
                                required
                                hint={
                                    selectedDates.length >= 3
                                        ? "Maximum 3 slots selected"
                                        : "Suggest some slots, we will contact you to confirm when we are free."
                                }
                            >
                                <div className="flex gap-2 mb-4">
                                    {(["suggested", "custom"] as const).map((mode) => (
                                        <button
                                            key={mode} type="button"
                                            onClick={() => { setDateMode(mode); }}
                                            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                                                dateMode === mode
                                                    ? "bg-[#F43F46] border-[#F43F46] text-white shadow"
                                                    : "bg-white border-gray-200 text-gray-500 hover:border-[#F43F46] hover:text-[#F43F46]"
                                            }`}
                                        >
                                            {mode === "suggested" ? "Suggested Slots" : "Custom Date"}
                                        </button>
                                    ))}
                                </div>

                                {dateMode === "suggested" ? (
                                    <>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                            {suggestedDates.map((d) => {
                                                const isSelected = selectedDates.includes(d.value);
                                                return (
                                                    <button
                                                        key={d.value}
                                                        type="button"
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                setSelectedDates((prev) => prev.filter((v) => v !== d.value));
                                                            } else if (selectedDates.length < 3) {
                                                                setSelectedDates((prev) => [...prev, d.value]);
                                                            } else {
                                                                toast.error("You can select a maximum of 3 date slots");
                                                            }
                                                        }}
                                                        className={`flex flex-col items-center justify-center rounded-xl border py-3 px-2 text-center text-sm font-medium transition-all ${
                                                            isSelected
                                                                ? "bg-[#F43F46] border-[#F43F46] text-white shadow-md scale-105 cursor-pointer"
                                                                : selectedDates.length >= 3
                                                                ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                                                                : "bg-gray-50 border-gray-200 text-gray-700 hover:border-[#F43F46] hover:text-[#F43F46] hover:bg-red-50 cursor-pointer"
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <svg className="w-3 h-3 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        <span className="text-[10px] uppercase tracking-wide opacity-70 mb-0.5">
                                                            {new Date(d.value + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                                                        </span>
                                                        <span className="text-xl font-bold leading-none">
                                                            {new Date(d.value + "T00:00:00").getDate()}
                                                        </span>
                                                        <span className="text-[10px] opacity-70 mt-0.5">
                                                            {new Date(d.value + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" })}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {selectedDates.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-400 font-medium self-center">{selectedDates.length}/3 selected:</span>
                                                {selectedDates.sort().map((v) => (
                                                    <span key={v} className="inline-flex items-center gap-1 text-xs bg-red-50 text-[#E31313] border border-red-100 rounded-full px-3 py-1 font-semibold">
                                                        {new Date(v + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedDates(selectedDates.filter((x) => x !== v))}
                                                            className="hover:text-[#c90f0f] ml-0.5"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="date"
                                            min={minDate}
                                            className={inputBase}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (!val) return;
                                                if (selectedDates.length >= 3) {
                                                    toast.error("You can select a maximum of 3 date slots");
                                                    e.target.value = "";
                                                    return;
                                                }
                                                if (!selectedDates.includes(val)) {
                                                    setSelectedDates((prev) => [...prev, val]);
                                                }
                                                e.target.value = "";
                                            }}
                                        />
                                        {selectedDates.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="text-xs text-gray-400 font-medium self-center">{selectedDates.length}/3 selected:</span>
                                                {selectedDates.sort().map((v) => (
                                                    <span key={v} className="inline-flex items-center gap-1 text-xs bg-red-50 text-[#E31313] border border-red-100 rounded-full px-3 py-1 font-semibold">
                                                        {new Date(v + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedDates(selectedDates.filter((x) => x !== v))}
                                                            className="hover:text-[#c90f0f] ml-0.5"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </FormField>

                            {/* Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-[#E31313] to-[#F43F46] hover:from-[#c90f0f] hover:to-[#d63339] disabled:opacity-60 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            Submitting…
                                        </>
                                    ) : (
                                        <>
                                            <Image src="/svgs/submit-logo.svg" alt="" width={20} height={20} />
                                            Claim My Free Audit
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    By submitting, you agree to be contacted by Megamind. Your information is safe with us.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FormField({
    label, required, hint, children,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
                {label}{required && <span className="text-[#F43F46] ml-1">*</span>}
            </label>
            {hint && <p className="text-xs text-gray-400 -mt-1">{hint}</p>}
            {children}
        </div>
    );
}
