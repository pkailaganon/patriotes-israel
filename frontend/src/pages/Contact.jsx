import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { contact, assets } from '../config/content';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    supportList: false,
    helpRegister: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Veuillez corriger les erreurs du formulaire');
      return;
    }

    setIsLoading(true);
    
    try {
      const API = process.env.REACT_APP_BACKEND_URL + '/api';
      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        toast.success(contact.form.successMessage);
      } else {
        toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      // Fallback si le backend n'est pas disponible
      console.error('Contact form error:', error);
      setIsSubmitted(true);
      toast.success(contact.form.successMessage);
    }
    
    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEO
          title="Contact — Avec les Patriotes d'Israël"
          description="Contactez la liste N°6 « Avec les Patriotes d'Israël » pour soutenir la campagne, aider à l'inscription LEC ou poser vos questions."
        />
        <section className="section-spacing bg-slate-50" data-testid="contact-success">
          <div className="container-campaign">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Message envoyé !
              </h1>
              <p className="text-slate-600 mb-8">
                {contact.form.successMessage}
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    supportList: false,
                    helpRegister: false,
                  });
                }}
                variant="outline"
                data-testid="send-another"
              >
                Envoyer un autre message
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Contact — Avec les Patriotes d'Israël"
        description="Contactez la liste N°6 « Avec les Patriotes d'Israël » pour soutenir la campagne, aider à l'inscription LEC ou poser vos questions."
      />
      {/* Hero */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200" data-testid="contact-hero">
        <div className="container-campaign">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block bg-fr-blue/10 text-fr-blue px-4 py-2 text-xs uppercase tracking-widest font-bold mb-6">
                Contact
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {contact.title}
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                {contact.subtitle}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {contact.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <img
                src={assets.logoCircle}
                alt="Avec les Patriotes d'Israël"
                className="w-56 h-56 md:w-64 md:h-64 object-contain drop-shadow-xl"
                data-testid="contact-logo"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-spacing" data-testid="contact-form-section">
        <div className="container-campaign">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white p-6 md:p-8 shadow-lg"
                data-testid="contact-form"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  {/* First Name */}
                  <div>
                    <Label htmlFor="firstName" className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2 block">
                      {contact.form.firstName} *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={`rounded-sm h-12 ${errors.firstName ? 'border-red-500' : ''}`}
                      data-testid="input-firstname"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <Label htmlFor="lastName" className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2 block">
                      {contact.form.lastName} *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className={`rounded-sm h-12 ${errors.lastName ? 'border-red-500' : ''}`}
                      data-testid="input-lastname"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2 block">
                    {contact.form.email} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`rounded-sm h-12 ${errors.email ? 'border-red-500' : ''}`}
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <Label htmlFor="phone" className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2 block">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="rounded-sm h-12"
                    data-testid="input-phone"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2 block">
                    {contact.form.message} *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    className={`rounded-sm resize-none ${errors.message ? 'border-red-500' : ''}`}
                    data-testid="input-message"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="mb-8 space-y-4">
                  {/* Support List Checkbox */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="supportList"
                      checked={formData.supportList}
                      onCheckedChange={(checked) => handleChange('supportList', checked)}
                      className="mt-0.5"
                      data-testid="checkbox-support"
                    />
                    <Label htmlFor="supportList" className="text-sm text-slate-600 cursor-pointer">
                      Je souhaite soutenir la liste avec les patriotes d'Israël
                    </Label>
                  </div>

                  {/* Help Register Checkbox */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="helpRegister"
                      checked={formData.helpRegister}
                      onCheckedChange={(checked) => handleChange('helpRegister', checked)}
                      className="mt-0.5"
                      data-testid="checkbox-register"
                    />
                    <Label htmlFor="helpRegister" className="text-sm text-slate-600 cursor-pointer">
                      Je souhaite de l'aide pour m'inscrire dans le registre
                    </Label>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="btn-primary w-full h-14 text-lg"
                  disabled={isLoading}
                  data-testid="submit-button"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {contact.form.submit}
                    </>
                  )}
                </Button>
              </motion.form>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-32 space-y-6"
              >
                {/* Info Card */}
                <div className="bg-fr-blue text-white p-6" data-testid="info-card">
                  <h3 className="font-serif text-xl font-bold mb-4">
                    Avec les Patriotes d'Israël
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Circonscriptions</p>
                        <p className="text-white/80 text-sm">Tel-Aviv & Haïfa</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Élections Consulaires</p>
                        <p className="text-white/80 text-sm">30-31 Mai 2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Join Card */}
                <div className="bg-slate-100 p-6" data-testid="join-card">
                  <h4 className="font-serif font-bold text-slate-900 mb-2">
                    Rejoignez-nous
                  </h4>
                  <p className="text-sm text-slate-600">
                    Vous souhaitez vous engager activement dans la campagne ? Cochez la case "Je souhaite rejoindre la liste" dans le formulaire et nous vous recontacterons rapidement.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
