"use client"
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-2 rounded-full text-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.div>
          <h2 className="text-4xl lg:text-5xl text-[#0F172A] mb-4">
            Let's Make a Difference Together
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you want to donate, volunteer, or partner with us, we'd love to hear from you
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#10B981]/10">
              <h3 className="text-2xl text-[#0F172A] mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#10B981] focus:outline-none transition-colors duration-300 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? 'top-2 text-xs text-[#10B981]'
                        : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                    placeholder=" "
                    required
                  />
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? 'top-2 text-xs text-[#10B981]'
                        : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'phone' || formData.phone
                        ? 'top-2 text-xs text-[#10B981]'
                        : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Phone Number (Optional)
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#10B981] focus:outline-none transition-colors duration-300 appearance-none bg-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="donation">Make a Donation</option>
                    <option value="volunteer">Volunteer with Us</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'subject' || formData.subject
                        ? 'top-2 text-xs text-[#10B981]'
                        : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className="w-full px-4 py-3 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#10B981] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder=" "
                    required
                  />
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? 'top-2 text-xs text-[#10B981]'
                        : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Your Message
                  </label>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#10B981] group hover:-translate-y-1"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0F172A] mb-2">Our Office</h4>
                    <p className="text-gray-600">
                      House 45, Road 12, Sector 7<br />
                      Uttara, Dhaka-1230<br />
                      Bangladesh 🇧🇩
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#10B981] group hover:-translate-y-1"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0F172A] mb-2">Phone</h4>
                    <p className="text-gray-600">
                      +880 1712-345678<br />
                      +880 2-8956789<br />
                      <span className="text-sm text-gray-500">Mon-Sat, 9AM-6PM</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#10B981] group hover:-translate-y-1"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-lg text-[#0F172A] mb-2">Email</h4>
                    <p className="text-gray-600">
                      info@humancareglobal.org<br />
                      donate@humancareglobal.org
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="h-64 bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.3
                }}></div>
                <div className="text-center z-10">
                  <MapPin className="w-16 h-16 text-[#10B981] mx-auto mb-3" />
                  <p className="text-[#0F172A]">Uttara, Dhaka, Bangladesh</p>
                  <button className="mt-3 text-[#10B981] hover:text-[#059669] text-sm underline">
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white">
              <h4 className="text-xl mb-4">Follow Our Journey</h4>
              <p className="text-white/70 mb-6 text-sm">
                Stay connected and see the daily impact of your support
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: '#1877F2' },
                  { icon: Twitter, color: '#1DA1F2' },
                  { icon: Instagram, color: '#E4405F' },
                  { icon: Linkedin, color: '#0A66C2' },
                ].map((social, idx) => (
                  <motion.button
                    key={idx}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
