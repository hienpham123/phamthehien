"use client";

import { useEffect, useState, useRef } from "react";
import TypingText from "@/components/common/TypingText";
import { COLORS } from "@/utils/constants";

const CODE_SNIPPETS = [
  "import socket",
  "import subprocess",
  "from scapy.all import *",
  "import requests",
  "import hashlib",
  "import base64",
  "import threading",
  "import nmap",
  "import paramiko",
  "def scan_port(host, port):",
  "    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
  "    result = sock.connect_ex((host, port))",
  "    return result == 0",
  "def brute_force(target, wordlist):",
  "    for password in wordlist:",
  "        if try_login(target, password):",
  "            return password",
  "def packet_sniffer(interface):",
  "    packets = sniff(iface=interface, count=100)",
  "    return packets",
  "def hash_cracker(hash_value, wordlist):",
  "    for word in wordlist:",
  "        if hashlib.md5(word.encode()).hexdigest() == hash_value:",
  "            return word",
  "def sql_injection(url, payload):",
  "    response = requests.get(url + payload)",
  "    return response.text",
  "def xss_scanner(url):",
  "    payload = '<script>alert(1)</script>'",
  "    return requests.get(url + payload)",
  "def reverse_shell(host, port):",
  "    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
  "    s.connect((host, port))",
  "    subprocess.call(['/bin/sh', '-i'], stdin=s.fileno())",
  "def keylogger():",
  "    import pynput",
  "    def on_press(key):",
  "        log_key(key)",
  "def network_scanner(network):",
  "    nm = nmap.PortScanner()",
  "    nm.scan(network, '22-443')",
  "    return nm.all_hosts()",
  "def ssh_brute_force(host, username, wordlist):",
  "    ssh = paramiko.SSHClient()",
  "    for password in wordlist:",
  "        try:",
  "            ssh.connect(host, username=username, password=password)",
  "            return password",
  "def dns_enumeration(domain):",
  "    import dns.resolver",
  "    records = dns.resolver.resolve(domain, 'A')",
  "    return [rdata.address for rdata in records]",
  "def web_crawler(url, depth=3):",
  "    visited = set()",
  "    def crawl(url, depth):",
  "        if depth == 0 or url in visited:",
  "            return",
  "        visited.add(url)",
  "        links = extract_links(url)",
  "        for link in links:",
  "            crawl(link, depth - 1)",
  "def encrypt_file(filename, key):",
  "    with open(filename, 'rb') as f:",
  "        data = f.read()",
  "    encrypted = xor_encrypt(data, key)",
  "    with open(filename + '.enc', 'wb') as f:",
  "        f.write(encrypted)",
  "def decrypt_file(filename, key):",
  "    with open(filename, 'rb') as f:",
  "        encrypted = f.read()",
  "    decrypted = xor_decrypt(encrypted, key)",
  "    return decrypted",
  "def bypass_waf(url, payload):",
  "    encoded = base64.b64encode(payload.encode()).decode()",
  "    return requests.get(url, params={'data': encoded})",
  "def exploit_vulnerability(target, exploit):",
  "    payload = build_payload(exploit)",
  "    response = send_payload(target, payload)",
  "    return check_success(response)",
  "def privilege_escalation():",
  "    import os",
  "    os.system('sudo -u root /bin/bash')",
  "def data_exfiltration(data, destination):",
  "    encoded = base64.b64encode(data.encode()).decode()",
  "    requests.post(destination, data=encoded)",
  "def steganography_hide(message, image):",
  "    from PIL import Image",
  "    img = Image.open(image)",
  "    pixels = img.load()",
  "    hide_message(pixels, message)",
  "def steganography_extract(image):",
  "    from PIL import Image",
  "    img = Image.open(image)",
  "    pixels = img.load()",
  "    return extract_message(pixels)",
  "def network_monitor(interface):",
  "    packets = sniff(iface=interface, prn=analyze_packet)",
  "    return packets",
  "def detect_intrusion(log_file):",
  "    with open(log_file, 'r') as f:",
  "        for line in f:",
  "            if is_suspicious(line):",
  "                alert(line)",
  "def generate_payload(exploit_type):",
  "    if exploit_type == 'buffer_overflow':",
  "        return 'A' * 1000 + '\\x90\\x90\\x90\\x90'",
  "    elif exploit_type == 'format_string':",
  "        return '%x%x%x%x%n'",
  "def obfuscate_code(code):",
  "    import base64",
  "    encoded = base64.b64encode(code.encode()).decode()",
  "    return f\"exec(base64.b64decode('{encoded}').decode())\"",
  "def create_backdoor(port):",
  "    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
  "    s.bind(('0.0.0.0', port))",
  "    s.listen(1)",
  "    conn, addr = s.accept()",
  "    return conn",
  "def rootkit_install():",
  "    subprocess.run(['insmod', 'rootkit.ko'])",
  "def log_cleaner(log_file):",
  "    with open(log_file, 'w') as f:",
  "        f.write('')",
  "def fingerprint_os(target):",
  "    response = requests.get(target, headers={'User-Agent': 'Nmap'})",
  "    return analyze_headers(response.headers)",
  "def find_vulnerabilities(target):",
  "    vulns = []",
  "    for exploit in EXPLOIT_DB:",
  "        if test_exploit(target, exploit):",
  "            vulns.append(exploit)",
  "    return vulns",
];

interface TerminalLine {
  text: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
  id: string;
  delay: number; // Delay for typing animation
}

export default function TerminalBackground() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const generateLines = (): TerminalLine[] => {
      const newLines: TerminalLine[] = [];
      if (typeof window === "undefined") return newLines;

      const height = window.innerHeight;
      const lineHeight = 24;
      const maxLines = Math.floor(height / lineHeight);
      const maxLinesToShow = Math.min(30, maxLines);

      const typingSpeed = 50; // ms per character
      const delayBetweenLines = 150; // ms between starting each line

      for (let i = 0; i < maxLinesToShow; i++) {
        const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        const isGreen = Math.random() > 0.3;
        const x = Math.random() * 20;
        const y = (i / maxLinesToShow) * 100;

        newLines.push({
          text: snippet,
          x,
          y,
          color: isGreen ? COLORS.primary : "#ffffff",
          opacity: isGreen ? 0.2 + Math.random() * 0.25 : 0.15 + Math.random() * 0.2,
          id: `line-${i}`,
          delay: 0, // Will be calculated after sorting
        });
      }

      // Sort lines by y position (top to bottom) to ensure proper visual order
      newLines.sort((a, b) => a.y - b.y);

      // Calculate delay for each line based on sorted order
      let cumulativeDelay = 0;
      newLines.forEach((line) => {
        line.delay = cumulativeDelay;
        // Calculate delay for next line: current delay + typing time of current line + delay between lines
        cumulativeDelay += line.text.length * typingSpeed + delayBetweenLines;
      });

      return newLines;
    };

    const initialLines = generateLines();
    setLines(initialLines);

    glitchIntervalRef.current = setInterval(() => {
      setLines((prev) =>
        prev.map((line) => ({
          ...line,
          text:
            Math.random() > 0.95
              ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
              : line.text,
        }))
      );
    }, 2000);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setLines(generateLines());
      }, 500);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1] bg-black"
      style={{ minHeight: "100vh", willChange: "auto" }}
    >
      {/* Scanline effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/8 to-transparent"
        style={{
          height: "1px",
          animation: "scanline 10s linear infinite",
        }}
      />

      {/* Terminal lines */}
      <div className="absolute inset-0">
        {isMounted && lines.map((line) => (
          <div
            key={line.id}
            className="absolute font-mono text-xs sm:text-sm select-none terminal-line"
            style={{
              left: `${line.x}%`,
              top: `${line.y}%`,
              color: line.color,
              opacity: line.opacity,
              textShadow:
                line.color === COLORS.primary
                  ? `0 0 8px ${line.color}, 0 0 16px ${line.color}`
                  : `0 0 4px ${line.color}`,
              willChange: "auto",
            }}
          >
            <TypingText text={line.text} speed={50} delay={line.delay} showCursor={false} />
            <span className="terminal-cursor">_</span>
          </div>
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

