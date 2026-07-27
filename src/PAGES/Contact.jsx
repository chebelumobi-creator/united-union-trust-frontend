import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building,
  Globe,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (800) 555-0199"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["uniteduniontrustbank@gmail.com"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["123 Wall Street", "New York, NY 10005", "United States"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Friday: 8:00 AM - 8:00 PM EST", "Saturday: 9:00 AM - 5:00 PM EST", "Sunday: Closed"],
      color: "bg-orange-100 text-orange-600"
    },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Contact Us - United Union Trust</title>
        <meta name="description" content="Get in touch with United Union Trust customer support for help with your account or banking services. Available 24/7 via phone, email, or contact form." />
        <meta property="og:title" content="Contact Us - United Union Trust" />
        <meta property="og:description" content="Get in touch with United Union Trust customer support for help with your account or banking services." />
        <meta property="og:url" content="https://www.uniteduniontrust.com/contact" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.uniteduniontrust.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <MessageCircle className="text-green-600" size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Us</h1>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${info.color}`}>
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-gray-600 mt-0.5">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-sm text-gray-500 mb-6">
              Have a question or concern? Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {isSubmitted && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <p className="text-green-700 text-sm">Your message has been sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your question or concern in detail..."
                  rows="5"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-70 w-full md:w-auto"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;