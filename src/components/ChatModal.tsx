"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setFormData({ name: "", phone: "", message: "" });
      setIsOpen(false);
      alert("Message sent successfully!");
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#B3F1AA] text-black shadow-lg flex items-center justify-center"
        style={{
          boxShadow: "0 4px 6px rgba(179, 241, 170, 0.3)",
        }}
        whileHover={{ 
          scale: 1.1,
          y: -2,
          boxShadow: "0 6px 12px rgba(179, 241, 170, 0.4)"
        }}
        whileTap={{ 
          scale: 0.95,
          y: 2,
          boxShadow: "0 2px 4px rgba(179, 241, 170, 0.3)"
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <div className="bg-black rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10">
                {/* Header */}
                <div className="bg-[#B3F1AA] p-6 relative">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-black hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-black font-bold text-lg">
                        {personalInfo.name}
                      </h3>
                      <p className="text-black/80 text-sm">
                        {personalInfo.title}
                      </p>
                      <p className="text-black/70 text-sm mt-2">
                        Welcome to my portfolio. Please enter your information
                        before starting the conversation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-black">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="chat-name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Your name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="chat-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-[#B3F1AA] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="chat-phone"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Your phone number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="chat-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-[#B3F1AA] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="chat-message"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Message<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="chat-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Enter your message*"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-[#B3F1AA] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-[#B3F1AA] text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#B3F1AA]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    style={{
                      boxShadow: "0 4px 6px rgba(179, 241, 170, 0.3)",
                    }}
                    whileHover={!isSubmitting ? { 
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0 6px 12px rgba(179, 241, 170, 0.4)"
                    } : {}}
                    whileTap={!isSubmitting ? { 
                      scale: 0.98,
                      y: 2,
                      boxShadow: "0 2px 4px rgba(179, 241, 170, 0.3)"
                    } : {}}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send message"}
                  </motion.button>

                  {/* Footer */}
                  <p className="text-center text-sm text-white/60 mt-4">
                    Powered by{" "}
                    <span className="text-[#B3F1AA] font-bold">
                      {personalInfo.name}
                    </span>
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

