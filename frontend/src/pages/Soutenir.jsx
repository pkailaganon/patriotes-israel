import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Shield, AlertTriangle, Info, Lock } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { assets } from '../config/content';
import { toast } from 'sonner';

const API = process.env.REACT_APP_BACKEND_URL + '/api';
const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';
const FRONTEND_DONATIONS_ENABLED =
  (process.env.REACT_APP_DONATIONS_ENABLED || 'true').toLowerCase() === 'true';

const PRESETS = [
  { value: 18, label: '18 €', subtitle: 'Chai (חי) — symbole de la Vie' },
  { value: 50, label: '50 €', subtitle: '20 flyers dans votre ville' },
  { value: 100, label: '100 €', subtitle: '1h de permanence téléphonique' },
  { value: 200, label: '200 €', subtitle: '200 SMS de mobilisation le 21 mai' },
];

const CURRENCIES = [
  { code: 'EUR', symbol: '€', min: 1, max: 4600 },
  { code: 'USD', symbol: '$', min: 1, max: 4600 },
  { code: 'ILS', symbol: '₪', min: 1, max: 20000 },
];

const CURRENCY_MAP = Object.fromEntries(CURRENCIES.map(c => [c.code, c]));

// ======================== Sub-components ========================

const DisabledNotice = () => (
  <div className="bg-amber-50 border-2 border-amber-300 p-8 text-center" data-testid="donations-disabled-notice">
    <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
      Dons temporairement indisponibles
    </h3>
    <p className="text-slate-700">
      La collecte de dons est actuellement suspendue. Merci de votre patience —
      vous pourrez bientôt nous soutenir. En attendant, vous pouvez nous aider
      en partageant notre message autour de vous.
    </p>
  </div>
);

const MandataireMissingWarning = () => (
  <div
    className="bg-red-50 border-2 border-red-500 p-6 rounded-sm mt-8"
    role="alert"
    data-testid="mandataire-missing"
  >
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-bold text-red-800 mb-1">
          ⚠️ Mandataire financier : à compléter
        </p>
        <p className="text-sm text-red-700">
          Les informations du mandataire financier ne sont pas renseignées.
          Merci de contacter l'équipe avant la mise en ligne publique —
          conformément au Code électoral (art. L52-4 et suivants).
        </p>
      </div>
    </div>
  </div>
);

const MandataireDisplay = ({ nom, adresse }) => (
  <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm mt-8 text-sm text-slate-700" data-testid="mandataire-display">
    <p className="font-bold text-slate-900 mb-2">Mandataire financier</p>
    <p>{nom}</p>
    <p className="whitespace-pre-line mb-3">{adresse}</p>
    <p className="text-xs text-slate-500 leading-relaxed">
      Ce don est effectué conformément aux articles L52-4 et suivants du Code électoral.
      Un reçu fiscal peut être délivré sur demande pour les dons supérieurs ou égaux à 150 €.
    </p>
  </div>
);

const CurrencyToggle = ({ value, onChange }) => (
  <div className="flex gap-2" role="radiogroup" aria-label="Devise du don">
    {CURRENCIES.map(cur => (
      <button
        key={cur.code}
        type="button"
        role="radio"
        aria-checked={value === cur.code}
        onClick={() => onChange(cur.code)}
        className={`flex-1 px-4 py-2 font-bold text-sm uppercase tracking-wider border-2 transition-colors rounded-sm ${
          value === cur.code
            ? 'bg-fr-blue border-fr-blue text-white'
            : 'bg-white border-slate-200 text-slate-600 hover:border-fr-blue'
        }`}
        data-testid={`currency-${cur.code.toLowerCase()}-btn`}
      >
        {cur.symbol} {cur.code}
      </button>
    ))}
  </div>
);

const PresetGrid = ({ selectedPreset, customAmount, onSelectPreset, onCustomChange, currency }) => {
  const showPresets = currency === 'EUR';
  const cur = CURRENCY_MAP[currency];

  return (
    <div className="space-y-3">
      {showPresets && (
        <div className="grid grid-cols-2 gap-3" data-testid="preset-grid">
          {PRESETS.map(p => (
            <button
              key={p.value}
              type="button"
              onClick={() => onSelectPreset(p.value)}
              className={`p-4 text-left border-2 rounded-sm transition-all ${
                selectedPreset === p.value
                  ? 'bg-fr-blue border-fr-blue text-white'
                  : 'bg-white border-slate-200 hover:border-fr-blue'
              }`}
              data-testid={`preset-${p.value}-btn`}
            >
              <div className="font-serif font-bold text-2xl mb-1">{p.label}</div>
              <div className={`text-xs leading-snug ${selectedPreset === p.value ? 'text-white/80' : 'text-slate-500'}`}>
                {p.subtitle}
              </div>
            </button>
          ))}
        </div>
      )}

      <div>
        <Label htmlFor="custom-amount" className="text-xs uppercase tracking-wider font-bold text-slate-700">
          {showPresets ? 'Ou montant libre' : 'Montant libre'}
        </Label>
        <div className="relative mt-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
            {cur.symbol}
          </span>
          <Input
            id="custom-amount"
            type="number"
            inputMode="decimal"
            min={cur.min}
            max={cur.max}
            step="1"
            value={customAmount}
            onChange={(e) => onCustomChange(e.target.value)}
            placeholder={`${cur.min} – ${cur.max}`}
            className="pl-10 h-12 rounded-sm"
            data-testid="custom-amount-input"
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Min {cur.min} {currency} · Max {cur.max} {currency} (plafond légal)
        </p>
      </div>
    </div>
  );
};

const IdentityForm = ({ donor, setDonor }) => {
  const update = (k) => (e) => setDonor({ ...donor, [k]: e.target.value });
  const field = (name, label, opts = {}) => (
    <div>
      <Label htmlFor={name} className="text-xs uppercase tracking-wider font-bold text-slate-700">
        {label} {opts.required !== false && <span className="text-republic-red">*</span>}
      </Label>
      <Input
        id={name}
        type={opts.type || 'text'}
        value={donor[name] || ''}
        onChange={update(name)}
        className="h-11 mt-1 rounded-sm"
        autoComplete={opts.autoComplete}
        data-testid={`donor-${name}-input`}
      />
    </div>
  );
  return (
    <div className="space-y-4" data-testid="identity-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field('firstName', 'Prénom', { autoComplete: 'given-name' })}
        {field('lastName', 'Nom', { autoComplete: 'family-name' })}
      </div>
      {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
      {field('phone', 'Téléphone', { type: 'tel', autoComplete: 'tel', required: false })}
      {field('address', 'Adresse', { autoComplete: 'street-address' })}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {field('postalCode', 'Code postal', { autoComplete: 'postal-code' })}
        <div className="md:col-span-2">{field('city', 'Ville', { autoComplete: 'address-level2' })}</div>
      </div>
      {field('country', 'Pays', { autoComplete: 'country-name' })}
    </div>
  );
};

const LegalCheckboxes = ({ accepts, setAccepts }) => {
  const toggle = (k) => (v) => setAccepts({ ...accepts, [k]: v === true });
  const Item = ({ name, label, testid }) => (
    <label htmlFor={name} className="flex items-start gap-3 cursor-pointer group">
      <Checkbox
        id={name}
        checked={accepts[name]}
        onCheckedChange={toggle(name)}
        className="mt-1 flex-shrink-0"
        data-testid={testid}
      />
      <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
        {label}
      </span>
    </label>
  );
  return (
    <div className="space-y-3 bg-slate-50 border border-slate-200 p-5 rounded-sm" data-testid="legal-checkboxes">
      <Item
        name="acceptPhysicalPerson"
        testid="accept-physical-person"
        label="Je certifie être une personne physique majeure de nationalité française."
      />
      <Item
        name="acceptPersonalFunds"
        testid="accept-personal-funds"
        label="Je certifie que ce don provient de mes fonds personnels et n'excède pas, avec les dons déjà effectués cette année, le plafond légal de 4 600 € par campagne."
      />
      <Item
        name="acceptDataCollection"
        testid="accept-data-collection"
        label="J'autorise la collecte de mes coordonnées conformément aux obligations légales de la Commission nationale des comptes de campagne (CNCCFP)."
      />
    </div>
  );
};

// ======================== Main page ========================

const Soutenir = () => {
  const navigate = useNavigate();

  // Config from backend (source of truth for kill-switch + mandataire)
  const [config, setConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(true);

  // Form state
  const [currency, setCurrency] = useState('EUR');
  const [selectedPreset, setSelectedPreset] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  const [donor, setDonor] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'France',
  });
  const [accepts, setAccepts] = useState({
    acceptPhysicalPerson: false,
    acceptPersonalFunds: false,
    acceptDataCollection: false,
  });

  useEffect(() => {
    fetch(`${API}/config/public`)
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig({
        donations_enabled: FRONTEND_DONATIONS_ENABLED,
        mandataire_nom: '', mandataire_adresse: '',
      }))
      .finally(() => setConfigLoading(false));
  }, []);

  // Reset preset if currency switches away from EUR
  useEffect(() => {
    if (currency !== 'EUR') setSelectedPreset(null);
  }, [currency]);

  // Effective amount (preset wins, otherwise customAmount)
  const amount = useMemo(() => {
    if (selectedPreset && currency === 'EUR') return selectedPreset;
    const parsed = parseFloat(customAmount);
    return isNaN(parsed) ? 0 : parsed;
  }, [selectedPreset, customAmount, currency]);

  const cur = CURRENCY_MAP[currency];
  const amountValid = amount >= cur.min && amount <= cur.max;
  const identityValid = !!(
    donor.firstName && donor.lastName && donor.email &&
    donor.address && donor.city && donor.postalCode && donor.country
  );
  const allAccepted = accepts.acceptPhysicalPerson && accepts.acceptPersonalFunds && accepts.acceptDataCollection;
  const canPay = amountValid && identityValid && allAccepted;

  // Donation disabled detection
  const donationsEnabled = (config?.donations_enabled ?? FRONTEND_DONATIONS_ENABLED);
  const mandataireNom = config?.mandataire_nom || '';
  const mandataireAdresse = config?.mandataire_adresse || '';
  const mandataireReady = mandataireNom && mandataireAdresse;

  const impactPresetForApi = (selectedPreset && currency === 'EUR') ? selectedPreset : null;

  // PayPal handlers
  const createOrder = async () => {
    if (!canPay) {
      toast.error("Merci de compléter le formulaire et d'accepter les 3 mentions légales.");
      throw new Error('Form incomplete');
    }
    const resp = await fetch(`${API}/paypal/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount, currency,
        impactPreset: impactPresetForApi,
        donor,
        acceptPhysicalPerson: accepts.acceptPhysicalPerson,
        acceptPersonalFunds: accepts.acceptPersonalFunds,
        acceptDataCollection: accepts.acceptDataCollection,
      }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      toast.error(data.detail || "Impossible de créer l'ordre PayPal.");
      throw new Error(data.detail || 'create-order failed');
    }
    return data.orderID;
  };

  const onApprove = async (data) => {
    try {
      const resp = await fetch(`${API}/paypal/capture-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const result = await resp.json();
      if (!resp.ok) {
        toast.error(result.detail || 'Capture échouée.');
        return;
      }
      toast.success('Merci pour votre soutien !');
      navigate('/soutenir/merci', {
        state: { amount, currency, captureID: result.captureID, donationID: result.donationID },
      });
    } catch (e) {
      toast.error('Erreur lors de la finalisation du don.');
    }
  };

  const onError = (err) => {
    console.error('PayPal error', err);
    toast.error("Une erreur est survenue avec PayPal. Merci de réessayer.");
  };

  // Initial loading
  if (configLoading) {
    return (
      <Layout>
        <SEO title="Soutenir — Avec les Patriotes d'Israël" />
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-slate-500">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Soutenir la liste N°6 — Avec les Patriotes d'Israël"
        description="Faites un don à la liste N°6 pour les élections consulaires 2026. Paiement sécurisé PayPal — EUR, USD, ILS. Conforme CNCCFP."
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-fr-blue to-il-blue text-white relative overflow-hidden" data-testid="soutenir-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="container-campaign relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-republic-red" fill="currentColor" />
                <span className="text-white/80 uppercase tracking-wider text-sm font-bold">
                  Soutenez la liste N°6
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Chaque don compte pour défendre les Français d'Israël
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Votre contribution finance la campagne terrain à Tel-Aviv et Haïfa.
                Paiement 100% sécurisé via PayPal.
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={assets.logoCircle}
              alt="Avec les Patriotes d'Israël"
              className="hidden lg:block w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl justify-self-end"
              data-testid="soutenir-logo"
            />
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-spacing bg-slate-50" data-testid="donation-section">
        <div className="container-campaign">
          {!donationsEnabled ? (
            <div className="max-w-2xl mx-auto">
              <DisabledNotice />
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
              {/* Form column */}
              <div className="lg:col-span-3 space-y-8">

                {!mandataireReady && <MandataireMissingWarning />}

                <div className="bg-white border border-slate-200 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      1. Votre don
                    </h2>
                    <p className="text-sm text-slate-500 mb-5">
                      Sélectionnez un montant symbolique ou saisissez le vôtre.
                    </p>
                    <div className="mb-5">
                      <Label className="text-xs uppercase tracking-wider font-bold text-slate-700 block mb-2">
                        Devise
                      </Label>
                      <CurrencyToggle value={currency} onChange={setCurrency} />
                    </div>
                    <PresetGrid
                      selectedPreset={selectedPreset}
                      customAmount={customAmount}
                      onSelectPreset={(v) => { setSelectedPreset(v); setCustomAmount(''); }}
                      onCustomChange={(v) => { setCustomAmount(v); setSelectedPreset(null); }}
                      currency={currency}
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      2. Vos coordonnées
                    </h2>
                    <p className="text-sm text-slate-500 mb-5">
                      Obligatoires pour la conformité CNCCFP. Aucun partage avec des tiers.
                    </p>
                    <IdentityForm donor={donor} setDonor={setDonor} />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      3. Mentions légales
                    </h2>
                    <p className="text-sm text-slate-500 mb-5">
                      Les 3 cases doivent être cochées pour activer le paiement.
                    </p>
                    <LegalCheckboxes accepts={accepts} setAccepts={setAccepts} />
                  </div>
                </div>

                <div className="bg-white border-2 border-fr-blue p-6 md:p-8" data-testid="paypal-section">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-4">
                    4. Paiement sécurisé
                  </h2>

                  {!canPay && (
                    <div className="flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-sm mb-4" data-testid="paypal-blocked-hint">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Complétez le montant, vos coordonnées et les 3 cases légales pour activer le bouton PayPal.
                      </span>
                    </div>
                  )}

                  {!PAYPAL_CLIENT_ID ? (
                    <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-sm">
                      PayPal n'est pas configuré. Contactez l'équipe.
                    </div>
                  ) : (
                    <div className={!canPay ? 'opacity-40 pointer-events-none' : ''} aria-disabled={!canPay}>
                      <PayPalScriptProvider
                        options={{
                          clientId: PAYPAL_CLIENT_ID,
                          currency,
                          intent: 'capture',
                          locale: 'fr_FR',
                        }}
                      >
                        <PayPalButtons
                          key={`${currency}-${amount}`}
                          disabled={!canPay}
                          forceReRender={[amount, currency, canPay]}
                          style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'donate' }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                    <Lock className="w-3 h-3" />
                    <span>Paiement chiffré via PayPal — aucune donnée bancaire ne transite par notre serveur.</span>
                  </div>
                </div>

                {mandataireReady ? (
                  <MandataireDisplay nom={mandataireNom} adresse={mandataireAdresse} />
                ) : (
                  // Already shown at top in red; avoid duplicating here
                  null
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="sticky top-28 space-y-6"
                >
                  <div className="bg-white p-6 border border-slate-200" data-testid="why-support-card">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-fr-blue/10 rounded-sm flex items-center justify-center">
                        <Shield className="w-5 h-5 text-fr-blue" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Pourquoi nous soutenir ?
                      </h3>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                      {[
                        'Financer la campagne terrain à Tel-Aviv et Haïfa',
                        'Produire des supports de communication percutants',
                        'Organiser des rencontres avec les Français d\'Israël',
                        'Envoyer un message fort à Paris',
                      ].map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-fr-blue rounded-full mt-2 flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-campaign-gold/10 border border-campaign-gold/30 p-6" data-testid="chai-card">
                    <h4 className="font-serif font-bold text-slate-900 mb-2">
                      18 € = Chai (חי) = La Vie
                    </h4>
                    <p className="text-sm text-slate-600">
                      Dans la tradition juive, le chiffre 18 symbolise la vie.
                      Un don de 18 € est un geste symbolique fort de soutien à notre combat.
                    </p>
                  </div>

                  <div className="bg-slate-900 text-white p-6" data-testid="security-card">
                    <div className="flex items-center gap-3 mb-3">
                      <Lock className="w-5 h-5" />
                      <h3 className="font-serif text-lg font-bold">Sécurité & conformité</h3>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>• Paiement traité par PayPal (PCI-DSS)</li>
                      <li>• Validation CNCCFP (L52-4 et suivants)</li>
                      <li>• Plafond légal : 4 600 € / an / donateur</li>
                      <li>• Reçu fiscal sur demande pour les dons ≥ 150 €</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Soutenir;
