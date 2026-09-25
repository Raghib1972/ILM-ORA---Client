"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Sparkles,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "@/lib/routerCompat"; // ← YE ADD KARO
const REDIRECT_DELAY_MS = 2500;

const colors = {
  primary: "from-blue-600 to-emerald-600",
  primarySolid: "bg-blue-600",
  accent: "from-yellow-400 to-orange-500",
  muted: "text-gray-600",
  surface: "bg-white",
};

export default function StudentEnroll() {
  const navigate = useNavigate(); // ← YE LINE INSERT KARO (useState ke UPAR)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    city: "",
    education: "",
    dob: "",
    referralCode: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Phone must be 10 digits";
    }
    if (!formData.course) errors.course = "Please select a course";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.education) errors.education = "Please select education level";
    if (!formData.dob) errors.dob = "Date of birth is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEnrollNow = () => {
    setCurrentStep(2);
  };

  const handleBackToHome = () => {
    alert("🏠 Redirecting to home page...");
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      setError("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form Data:", formData);
      setCurrentStep(3);
    } catch (error) {
      setError("Enrollment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      setError("Please select a payment method");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Payment Method:", selectedPayment);
      console.log("Complete Enrollment Data:", formData);

      setCurrentStep(4);

      setTimeout(() => {
        alert("🎉 Redirecting to login page...");
      }, REDIRECT_DELAY_MS);
    } catch (error) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 1: Landing Page
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-100 flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl"></div>
        </div>

        <div
          className={`max-w-xl w-full ${colors.surface} backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10 hover:shadow-blue-200/50 transition-shadow duration-500`}
        >
          <button
            onClick={handleBackToHome}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-all hover:rotate-90 duration-300"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>

          <div className="text-center mb-6">
            <div
              className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.primary} rounded-xl flex items-center justify-center shadow-xl mb-4 relative overflow-hidden group`}
            >
              <span className="text-3xl relative z-10">🎓</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>

            <h1
              className={`text-2xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2`}
            >
              Ready to Start Your Journey?
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            </h1>
            <p className={`text-sm ${colors.muted} max-w-md mx-auto`}>
              Join <span className="font-bold text-blue-600">50,000+</span>{" "}
              students transforming their careers with expert-led courses
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                bg: "from-blue-50 to-blue-100",
                border: "border-blue-200",
                gradient: colors.primary,
                title: "Expert Mentors",
                desc: "From FAANG",
                icon: "👨‍🏫",
              },
              {
                bg: "from-yellow-50 to-orange-50",
                border: "border-yellow-200",
                gradient: colors.accent,
                title: "Live Projects",
                desc: "Build portfolio",
                icon: "💼",
              },
              {
                bg: "from-emerald-50 to-emerald-100",
                border: "border-emerald-200",
                gradient: "from-emerald-500 to-emerald-600",
                title: "Job Support",
                desc: "95% placement",
                icon: "🎯",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-3 bg-gradient-to-br ${item.bg} rounded-xl border ${item.border} hover:scale-105 transition-transform duration-300 cursor-pointer group`}
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <span className="text-lg">{item.icon}</span>
                </div>
                <p className="font-semibold text-sm text-gray-800 mb-0.5">
                  {item.title}
                </p>
                <p className={`text-xs ${colors.muted}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleEnrollNow}
              className={`w-full bg-gradient-to-r ${colors.primary} text-white py-3.5 px-6 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Yes, Enroll Me Now!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>

            <button
              onClick={handleBackToHome}
              className="w-full border-2 border-gray-300 text-gray-700 py-3.5 px-6 rounded-xl font-medium text-base hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Maybe Later, Back to Home</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <span>🔒</span>
              <span>100% Secure & Trusted by Thousands</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Enrollment Form
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-100 flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div
          className={`max-w-2xl w-full ${colors.surface} backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10 max-h-[95vh] overflow-y-auto`}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all hover:-translate-x-1 duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1 text-center">
                <h2
                  className={`text-xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent flex items-center justify-center gap-2`}
                >
                  Enrollment Form
                  <span className="text-lg">📋</span>
                </h2>
                <p className={`${colors.muted} text-xs mt-1`}>
                  Just a few details to get you started
                </p>
              </div>
              <div className="w-8"></div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${colors.primary} h-1.5 rounded-full transition-all duration-500 relative`}
                style={{ width: "50%" }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                Personal Information
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.fullName ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all hover:border-blue-300`}
                />
                {formErrors.fullName && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.email ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all hover:border-blue-300`}
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.phone ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all hover:border-blue-300`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.dob ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all hover:border-blue-300`}
                  />
                  {formErrors.dob && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.dob}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.city ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all hover:border-blue-300`}
                  />
                  {formErrors.city && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.city}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                </div>
                Course Information
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Select Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.course ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all hover:border-emerald-300`}
                >
                  <option value="">Choose a course...</option>
                  <option value="web-dev">Full Stack Web Development</option>
                  <option value="data-science">Data Science & AI</option>
                  <option value="mobile-dev">Mobile App Development</option>
                  <option value="cloud">Cloud Computing & DevOps</option>
                  <option value="cyber">Cybersecurity</option>
                  <option value="blockchain">Blockchain Development</option>
                </select>
                {formErrors.course && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.course}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Education Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${formErrors.education ? "border-red-300 bg-red-50" : "border-gray-200"} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all hover:border-emerald-300`}
                >
                  <option value="">Select your education...</option>
                  <option value="high-school"> High School</option>
                  <option value="diploma"> Diploma</option>
                  <option value="bachelors"> Bachelor's Degree</option>
                  <option value="masters"> Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
                {formErrors.education && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.education}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Referral Code{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="Enter referral code if you have one"
                  className="w-full px-3 py-2 text-sm rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all hover:border-emerald-300"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r ${colors.primary} text-white py-3.5 px-6 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="relative z-10">Submitting...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Continue to Payment</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                  </>
                )}
              </button>
            </div>
          </div>

          <p
            className={`text-center text-xs ${colors.muted} mt-4 flex items-center justify-center gap-1`}
          >
            <span>🔒</span>
            <span>Your information is secure and will never be shared</span>
          </p>
        </div>
      </div>
    );
  }

  // STEP 3: Payment Selection
  if (currentStep === 3) {
    const paymentMethods = [
      {
        id: "razorpay",
        name: "Razorpay",
        icon: "💳",
        desc: "UPI, Cards, EMI, Wallets",
        tag: "Recommended",
        gradient: "from-blue-500 to-indigo-600",
        bg: "from-blue-50 to-indigo-50",
      },
      {
        id: "paytm",
        name: "Paytm",
        icon: "📱",
        desc: "Fast UPI/Wallets with analytics",
        tag: "Popular",
        gradient: "from-cyan-500 to-blue-600",
        bg: "from-cyan-50 to-blue-50",
      },
      {
        id: "phonepe",
        name: "PhonePe",
        icon: "💜",
        desc: "Zero UPI fees",
        tag: "Zero Fees",
        gradient: "from-purple-500 to-violet-600",
        bg: "from-purple-50 to-violet-50",
      },
      {
        id: "googlepay",
        name: "Google Pay",
        icon: "🔴",
        desc: "Quick & Secure UPI",
        tag: "Fast",
        gradient: "from-red-500 to-yellow-500",
        bg: "from-red-50 to-yellow-50",
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div
          className={`max-w-2xl w-full ${colors.surface} backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10`}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all hover:-translate-x-1 duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1 text-center">
                <h2
                  className={`text-xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent flex items-center justify-center gap-2`}
                >
                  Choose Payment Method
                  <span className="text-lg">💰</span>
                </h2>
                <p className={`${colors.muted} text-xs mt-1`}>
                  Secure & encrypted payment gateway
                </p>
              </div>
              <div className="w-8"></div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${colors.primary} h-1.5 rounded-full transition-all duration-500 relative`}
                style={{ width: "75%" }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="mb-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-gray-800">
                  Course Fee
                </h3>
                <div className="text-right">
                  <p className="text-xs text-gray-500 line-through">₹50,000</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    ₹29,999
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  40% OFF 🎉
                </span>
                <span className="text-gray-600">Limited time offer</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPayment === method.id
                      ? `border-blue-500 bg-gradient-to-br ${method.bg} shadow-xl`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {method.tag && (
                    <span
                      className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${method.gradient} text-white shadow-lg`}
                    >
                      {method.tag}
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center shadow-lg text-2xl`}
                    >
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">
                        {method.name}
                      </h4>
                      <p className="text-xs text-gray-600">{method.desc}</p>
                    </div>
                  </div>

                  {selectedPayment === method.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isSubmitting || !selectedPayment}
              className={`w-full bg-gradient-to-r ${colors.primary} text-white py-3.5 px-6 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="relative z-10">Processing Payment...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Proceed to Pay ₹29,999</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                </>
              )}
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <p
              className={`text-center text-xs ${colors.muted} flex items-center justify-center gap-1`}
            >
              <span>🔒</span>
              <span>100% Secure & Encrypted Payment Gateway</span>
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">✅ SSL Secured</span>
              <span className="flex items-center gap-1">✅ PCI Compliant</span>
              <span className="flex items-center gap-1">✅ 24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 4: Success Page
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-100 flex items-center justify-center p-3 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <div
          className={`max-w-xl w-full ${colors.surface} backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-6 text-center relative z-10`}
        >
          <div
            className={`w-20 h-20 mx-auto bg-gradient-to-br ${colors.primary} rounded-full flex items-center justify-center shadow-xl mb-4 animate-bounce relative`}
          >
            <CheckCircle className="w-10 h-10 text-white" />
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          </div>

          <h1
            className={`text-2xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-2`}
          >
            Payment Successful! 🎉
          </h1>
          <p className={`text-base ${colors.muted} mb-2 max-w-md mx-auto`}>
            Welcome aboard,{" "}
            <span className="font-bold text-emerald-600">
              {formData.fullName}
            </span>
            !
          </p>
          <p className={`${colors.muted} text-sm mb-6`}>
            Confirmation email sent to{" "}
            <span className="font-semibold text-blue-600">
              {formData.email}
            </span>
          </p>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-10 h-10 border-4 border-emerald-200 border-b-emerald-600 rounded-full animate-spin"
                style={{ animationDirection: "reverse" }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => navigate("/login?role=student")}
            className={`bg-gradient-to-r ${colors.primary} text-white py-3.5 px-6 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">Go to Dashboard Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
          </button>

          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-50 rounded-xl border border-blue-200 hover:border-emerald-300 transition-colors">
            <h3 className="font-semibold text-sm text-gray-800 mb-2 flex items-center justify-center gap-2">
              <span>📧</span>
              <span>What's Next?</span>
            </h3>
            <div
              className={`text-xs ${colors.muted} space-y-2 text-left max-w-sm mx-auto`}
            >
              {[
                {
                  icon: "✉️",
                  text: "Check your email for course access details",
                },
                { icon: "👤", text: "Complete your profile in the dashboard" },
                { icon: "💬", text: "Join our community Discord server" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2 bg-white/50 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-400">
              🎊 Get ready for an amazing learning experience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
