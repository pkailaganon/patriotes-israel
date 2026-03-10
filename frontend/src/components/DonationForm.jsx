import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Facebook, Check, CreditCard } from 'lucide-react';
import { donation } from '../config/content';
import { generatePaymentUrl, isPaymentConfigured } from '../config/payment';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('ILS');
  const [isSuccess, setIsSuccess] = useState(false);

  const currencySymbol = donation.currencies[currency].symbol;
  const conversionRate = donation.currencies[currency].rate;

  const getFinalAmount = () => {
    const baseAmount = selectedAmount || parseInt(customAmount) || 0;
    return currency === 'EUR' ? Math.round(baseAmount / 4) : baseAmount;
  };

  const handleDonate = () => {
    const amount = getFinalAmount();
    if (amount < 1) {
      toast.error('Veuillez sélectionner ou entrer un montant');
      return;
    }

    // Convert to ILS for payment
    const ilsAmount = currency === 'EUR' ? amount * 4 : amount;

    if (isPaymentConfigured()) {
      // Redirect to HYP payment page
      window.location.href = generatePaymentUrl(ilsAmount);
    } else {
      // Simulate success for demo
      toast.success('Redirection vers la page de paiement...');
      setTimeout(() => {
        setIsSuccess(true);
      }, 1500);
    }
  };

  const handleShare = (platform) => {
    const message = encodeURIComponent(donation.shareMessage);
    const url = encodeURIComponent(window.location.origin);

    const urls = {
      whatsapp: `https://wa.me/?text=${message}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${message}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 text-center"
        data-testid="donation-success"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Merci pour votre soutien !
        </h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          {donation.successMessage}
        </p>

        {/* Share buttons */}
        <div className="space-y-4">
          <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">
            Partagez avec vos proches
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => handleShare('whatsapp')}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
              data-testid="share-whatsapp"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={() => handleShare('telegram')}
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white"
              data-testid="share-telegram"
            >
              <Send className="w-5 h-5 mr-2" />
              Telegram
            </Button>
            <Button
              onClick={() => handleShare('facebook')}
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white"
              data-testid="share-facebook"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </Button>
          </div>
        </div>

        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-8"
          data-testid="donate-again"
        >
          Faire un autre don
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 shadow-lg" data-testid="donation-form">
      {/* Currency Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-slate-100 p-1 rounded-sm">
          <button
            onClick={() => setCurrency('ILS')}
            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
              currency === 'ILS'
                ? 'bg-fr-blue text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="currency-ils"
          >
            ₪ ILS
          </button>
          <button
            onClick={() => setCurrency('EUR')}
            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
              currency === 'EUR'
                ? 'bg-fr-blue text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="currency-eur"
          >
            € EUR
          </button>
        </div>
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {donation.presets.map((preset) => {
          const displayAmount = currency === 'EUR' 
            ? Math.round(preset.amount / 4) 
            : preset.amount;
          
          return (
            <button
              key={preset.amount}
              onClick={() => {
                setSelectedAmount(preset.amount);
                setCustomAmount('');
              }}
              className={`relative p-4 md:p-6 border-2 transition-all duration-200 ${
                selectedAmount === preset.amount
                  ? 'border-fr-blue bg-fr-blue/5 shadow-md'
                  : 'border-slate-200 hover:border-fr-blue/50'
              } ${preset.special ? 'ring-2 ring-campaign-gold ring-offset-2' : ''}`}
              data-testid={`amount-${preset.amount}`}
            >
              <span className="countdown-number text-2xl md:text-3xl font-bold text-fr-blue block">
                {currencySymbol}{displayAmount}
              </span>
              {preset.special && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-campaign-gold text-white text-xs px-2 py-0.5 font-medium">
                  {preset.meaning}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Amount */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">
          Ou entrez un montant libre
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
            {currencySymbol}
          </span>
          <Input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            placeholder="Montant"
            className="pl-10 h-14 text-lg font-medium rounded-sm border-slate-300 focus:ring-fr-blue focus:border-fr-blue"
            data-testid="custom-amount"
          />
        </div>
      </div>

      {/* Donate Button */}
      <Button
        onClick={handleDonate}
        className="w-full btn-accent h-14 text-lg"
        data-testid="donate-button"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Faire un don de {currencySymbol}{getFinalAmount() || '...'}
      </Button>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 uppercase tracking-wider text-center mb-3">
          Moyens de paiement acceptés
        </p>
        <div className="flex justify-center items-center gap-4 text-slate-400">
          {donation.paymentMethods.map((method) => (
            <span
              key={method}
              className="text-sm font-medium bg-slate-100 px-3 py-1 rounded"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
