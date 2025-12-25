export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  timestamp: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Technical Director",
    content: "The overall design service was impressive, from logo to website. I'll definitely recommend them!",
    timestamp: "2024-01-15 14:32:01",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Consulting Specialist",
    content: "The branding design was outstanding, capturing our brand's essence perfectly. Thanks to the design team!",
    timestamp: "2024-02-03 09:15:42",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Executive Director",
    content: "The design team developed an effective social marketing campaign that boosted our brand's online presence significantly!",
    timestamp: "2024-02-18 16:45:23",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Project Manager",
    content: "The website design service was excellent. User-friendly and well-optimized. A wonderful experience overall!",
    timestamp: "2024-03-05 11:20:15",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Business Owner",
    content: "The logo design exceeded my expectations. It's beautiful and perfectly fits our brand. Very satisfied!",
    timestamp: "2024-03-22 13:55:30",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Marketing Director",
    content: "The design team created a fantastic new brand identity, bringing innovative solutions. The quality is impressive!",
    timestamp: "2024-04-10 10:08:57",
  },
];

