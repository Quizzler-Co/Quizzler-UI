import React, { useState } from "react";
import { Mail, MessageCircle, Send, Phone, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui-components/Card";
import Input from "../components/ui-components/Input";
import Label from "../components/ui-components/Label";
import Button from "../components/ui-components/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || "Contact from Quizzler");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:iacsdvedang@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-black bg-white mb-6">
            <MessageCircle className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you! Get in touch with us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-black/5">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Email Us</h3>
                    <a
                      href="mailto:iacsdvedang@gmail.com"
                      className="text-gray-600 hover:text-black transition-colors break-all"
                    >
                      iacsdvedang@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-black/5">
                    <MessageCircle className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Response Time</h3>
                    <p className="text-gray-600">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-black/5">
                    <Send className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Quick Contact</h3>
                    <p className="text-gray-600">
                      Click the email above or fill out the form to send us a message
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Clicking "Send Message" will open your default email client with the message pre-filled.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="mt-8 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-black mb-2">Other Ways to Reach Us</h3>
            <p className="text-gray-600 mb-4">
              For urgent matters or technical support, please include "URGENT" in your subject line.
            </p>
            <a
              href="mailto:iacsdvedang@gmail.com"
              className="inline-flex items-center gap-2 text-black hover:underline font-semibold"
            >
              <Mail className="h-5 w-5" />
              iacsdvedang@gmail.com
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;

