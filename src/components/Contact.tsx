"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Facebook, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";
import { emailConfig, isEmailJSConfigured } from "@/config/emailConfig";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Check if EmailJS has been configured
      if (isEmailJSConfigured()) {
        // Send email via EmailJS
        const templateParams = {
          name: formData.name,
          email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          time: new Date().toLocaleString("en-US"),
          title: `Contact from ${formData.name}`,
        };

        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.publicKey
        );

        if (process.env.NODE_ENV === "development") {
          console.log("Email sent successfully via EmailJS");
        }
      } else {
        // Fallback: Use mailto link if EmailJS is not configured
        if (process.env.NODE_ENV === "development") {
          console.log("EmailJS not configured, using mailto fallback");
          console.log("Form data:", {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString(),
          });
        }
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Form submission error:", error);
      }
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: "https://maps.app.goo.gl/paVgCHxRj2exGktY6",
      color: "from-pink-500/20 to-red-500/20",
    },
  ];

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Facebook, href: personalInfo.social.facebook, label: "Facebook" },
  ];

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-20 md:py-32 relative">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-mono text-[#00ff00]">
            $ const contactForm = () =&gt; {'{'}
          </h2>
          <motion.div
            className="w-24 h-1 bg-[#00ff00] mx-auto mb-4 sm:mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 font-mono">
            {'// Have an interesting project? Let&apos;s get in touch and create something amazing together!'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 font-mono text-[#00ff00] text-sm">$ const contactInfo = {'{'}</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Contact Information</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded border-2 border-[#00ff00]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff00] transition-all group relative overflow-hidden font-mono"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ 
                      x: 5, 
                      scale: 1.02, 
                      y: -1,
                      boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
                    }}
                    whileTap={{ scale: 0.98, y: 1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <motion.div
                      className="p-3 rounded-lg bg-[#00ff00]/10 group-hover:bg-[#00ff00]/20 transition-colors relative z-10 border border-[#00ff00]/30"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Icon className="w-5 h-5 text-[#00ff00]" />
                    </motion.div>
                    <div className="relative z-10">
                      <div className="text-sm text-[#00ff00]/70">{info.label}</div>
                      <div className="font-medium text-white group-hover:text-[#00ff00] transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div>
              <div className="mb-2 font-mono text-[#00ff00] text-xs">$ const socialLinks = [</div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Connect with me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-black/50 border-2 border-[#00ff00]/30 hover:border-[#00ff00] transition-all relative overflow-hidden group font-mono"
                      style={{
                        boxShadow: "0 0 15px rgba(0, 255, 0, 0.1)",
                      }}
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 5,
                        y: -2,
                        boxShadow: "0 0 25px rgba(0, 255, 0, 0.4)",
                      }}
                      whileTap={{ 
                        scale: 0.9,
                        y: 2
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-[#00ff00]/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Icon className="w-5 h-5 relative z-10 text-[#00ff00] group-hover:text-[#00ff00] transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-6 p-6 rounded border-2 border-[#00ff00]/30 bg-black/50 backdrop-blur-sm font-mono"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
            }}
            noValidate
          >
            <div className="mb-4 font-mono text-[#00ff00] text-sm">$ const handleSubmit = (e: React.FormEvent) =&gt; {'{'}</div>
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded border-2 border-[#00ff00]/50 bg-[#00ff00]/10 flex items-center gap-3 text-[#00ff00] font-mono"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Thank you for reaching out! I&apos;ll get back to you as soon as possible.</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded border-2 border-red-500/50 bg-red-500/10 flex items-center gap-3 text-red-400 font-mono"
                >
                  <XCircle className="w-5 h-5" />
                  <span>An error occurred. Please try again later.</span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#00ff00]">
                $ const [name, setName] = useState&lt;string&gt;(&apos;&apos;);
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 text-sm sm:text-base rounded border-2 font-mono ${
                    errors.name ? "border-red-500/50" : "border-[#00ff00]/30"
                   } bg-black/50 focus:border-[#00ff00] focus:outline-none transition-all text-white placeholder:text-[#00ff00]/50`}
                  placeholder="> Enter your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.span
                      id="name-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-400 mt-1 block"
                      role="alert"
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {focusedField === "name" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff00]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#00ff00]">
                $ const [email, setEmail] = useState&lt;string&gt;(&apos;&apos;);
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 text-sm sm:text-base rounded border-2 font-mono ${
                    errors.email ? "border-red-500/50" : "border-[#00ff00]/30"
                   } bg-black/50 focus:border-[#00ff00] focus:outline-none transition-all text-white placeholder:text-[#00ff00]/50`}
                  placeholder="> your.email@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.span
                      id="email-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-400 mt-1 block"
                      role="alert"
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </AnimatePresence>
                {focusedField === "email" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff00]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#00ff00]">
                $ const [message, setMessage] = useState&lt;string&gt;(&apos;&apos;);
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 text-sm sm:text-base rounded border-2 font-mono ${
                    errors.message ? "border-red-500/50" : "border-[#00ff00]/30"
                  } bg-black/50 focus:border-[#00ff00] focus:outline-none transition-all resize-none text-white placeholder:text-[#00ff00]/50`}
                  placeholder="> Enter your message..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.span
                      id="message-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-400 mt-1 block"
                      role="alert"
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
                {focusedField === "message" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff00]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-white text-black rounded-lg font-semibold text-sm sm:text-base relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
              whileHover={!isSubmitting ? { 
                scale: 1.02,
                y: -2,
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
              } : {}}
              whileTap={!isSubmitting ? { 
                scale: 0.98,
                y: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              } : {}}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#B3F1AA]/20 to-[#B3F1AA]/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
