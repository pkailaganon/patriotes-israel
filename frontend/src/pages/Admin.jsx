import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, CreditCard, Mail, Eye, Trash2, Check, 
  RefreshCw, LogOut, ChevronDown, Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API}/admin/contacts/stats`, {
        headers: {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }
      });
      
      if (response.ok) {
        onLogin({ username, password });
        toast.success('Connexion réussie');
      } else {
        toast.error('Identifiants incorrects');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Backoffice
          </h1>
          <p className="text-slate-500 text-sm">
            Avec les Patriotes d'Israël
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">
              Identifiant
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12"
              data-testid="admin-username"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">
              Mot de passe
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              data-testid="admin-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-fr-blue hover:bg-fr-blue/90 h-12"
            disabled={loading}
            data-testid="admin-login-btn"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

const StatsCard = ({ icon: Icon, label, value, subValue, color = "fr-blue" }) => (
  <div className="bg-white p-6 border border-slate-200">
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-10 h-10 bg-${color}/10 rounded flex items-center justify-center`}>
        <Icon className={`w-5 h-5 text-${color}`} />
      </div>
      <span className="text-sm text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
    {subValue && <p className="text-sm text-slate-500 mt-1">{subValue}</p>}
  </div>
);

const ContactsTable = ({ auth }) => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, wantToSupport: 0, needHelpRegister: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const authHeader = { 'Authorization': 'Basic ' + btoa(`${auth.username}:${auth.password}`) };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const unreadOnly = filter === 'unread';
      const response = await fetch(
        `${API}/admin/contacts?unread_only=${unreadOnly}`,
        { headers: authHeader }
      );
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      toast.error('Erreur de chargement');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API}/admin/contacts/stats`, { headers: authHeader });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [filter]);

  const markAsRead = async (id) => {
    try {
      await fetch(`${API}/admin/contacts/${id}/read`, {
        method: 'PATCH',
        headers: authHeader
      });
      toast.success('Marqué comme lu');
      fetchContacts();
      fetchStats();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Supprimer ce contact ?')) return;
    try {
      await fetch(`${API}/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: authHeader
      });
      toast.success('Contact supprimé');
      fetchContacts();
      fetchStats();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard icon={Mail} label="Total Messages" value={stats.total} />
        <StatsCard icon={Eye} label="Non lus" value={stats.unread} color="republic-red" />
        <StatsCard icon={Users} label="Veulent soutenir" value={stats.wantToSupport} color="il-blue" />
        <StatsCard icon={Users} label="Aide inscription" value={stats.needHelpRegister} color="campaign-gold" />
      </div>

      <div className="bg-white border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Messages de contact</h2>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-slate-200 rounded px-3 py-1 text-sm"
            >
              <option value="all">Tous</option>
              <option value="unread">Non lus</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchContacts}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Chargement...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Aucun message</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 ${!contact.read ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900">
                      {contact.firstName} {contact.lastName}
                    </span>
                    {contact.supportList && (
                      <span className="text-xs bg-il-blue text-white px-2 py-0.5 rounded">
                        Veut soutenir
                      </span>
                    )}
                    {contact.helpRegister && (
                      <span className="text-xs bg-campaign-gold text-white px-2 py-0.5 rounded">
                        Aide inscription
                      </span>
                    )}
                    {!contact.read && (
                      <span className="text-xs bg-republic-red text-white px-2 py-0.5 rounded">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">
                  {contact.email}
                  {contact.phone && <span className="ml-3">📞 {contact.phone}</span>}
                </p>
                <p className="text-slate-700 text-sm bg-slate-50 p-3 rounded mt-2">
                  {contact.message}
                </p>
                <div className="flex gap-2 mt-3">
                  {!contact.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(contact.id)}
                    >
                      <Check className="w-4 h-4 mr-1" /> Marquer lu
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => deleteContact(contact.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DonationsTable = ({ auth }) => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0, completedDonations: 0, pendingDonations: 0, failedDonations: 0,
    byCurrency: {},
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const authHeader = { 'Authorization': 'Basic ' + btoa(`${auth.username}:${auth.password}`) };

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const url = statusFilter
        ? `${API}/admin/donations?status=${statusFilter}`
        : `${API}/admin/donations`;
      const response = await fetch(url, { headers: authHeader });
      const data = await response.json();
      setDonations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erreur de chargement');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API}/admin/donations/stats`, { headers: authHeader });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleExportCSV = () => {
    const url = `${API}/admin/donations/export.csv`;
    // Use fetch to include auth, then trigger download
    fetch(url, { headers: authHeader })
      .then(r => r.blob())
      .then(blob => {
        const href = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = href;
        a.download = `dons-cnccfp-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(href);
      })
      .catch(() => toast.error("Erreur d'export"));
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    const labels = {
      completed: 'Complété',
      pending: 'En attente',
      failed: 'Échoué',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
        {labels[status] || status || '—'}
      </span>
    );
  };

  const currencySymbol = (c) => ({ EUR: '€', USD: '$', ILS: '₪' }[c] || c);

  // Render per-currency totals summary
  const byCurrencyEntries = Object.entries(stats.byCurrency || {});

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard icon={CreditCard} label="Total Dons" value={stats.totalDonations} />
        <StatsCard icon={Check} label="Complétés" value={stats.completedDonations} color="il-blue" />
        <StatsCard icon={CreditCard} label="En attente" value={stats.pendingDonations} color="campaign-gold" />
        <StatsCard icon={CreditCard} label="Échoués" value={stats.failedDonations} color="republic-red" />
      </div>

      {byCurrencyEntries.length > 0 && (
        <div className="bg-white p-4 border border-slate-200 mb-6">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-bold">
            Montant collecté (complétés)
          </p>
          <div className="flex flex-wrap gap-6">
            {byCurrencyEntries.map(([cur, info]) => (
              <div key={cur} data-testid={`currency-total-${cur.toLowerCase()}`}>
                <div className="text-2xl font-bold text-slate-900">
                  {currencySymbol(cur)}{Number(info.total).toLocaleString('fr-FR')}
                </div>
                <div className="text-xs text-slate-500">
                  {cur} · {info.count} don{info.count > 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <h2 className="font-bold text-slate-900">Liste des dons</h2>
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded px-3 py-1 text-sm"
              data-testid="donations-status-filter"
            >
              <option value="">Tous</option>
              <option value="completed">Complétés</option>
              <option value="pending">En attente</option>
              <option value="failed">Échoués</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchDonations} data-testid="donations-refresh">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="text-fr-blue border-fr-blue hover:bg-fr-blue hover:text-white"
              data-testid="donations-export-csv"
            >
              Export CSV (CNCCFP)
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Chargement...</div>
        ) : donations.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Aucun don</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Date</th>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Donateur</th>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Contact</th>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Montant</th>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Preset</th>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Statut</th>
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-500 font-bold">PayPal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.map((d) => {
                  const donor = d.donor || {};
                  const dateStr = d.created_at
                    ? new Date(d.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                      })
                    : '—';
                  return (
                    <tr key={d.id} className="hover:bg-slate-50" data-testid={`donation-row-${d.id}`}>
                      <td className="p-3 text-sm text-slate-500">{dateStr}</td>
                      <td className="p-3">
                        {donor.firstName || donor.lastName
                          ? `${donor.firstName || ''} ${donor.lastName || ''}`.trim()
                          : <span className="text-slate-400">—</span>}
                        {donor.city && (
                          <div className="text-xs text-slate-400">{donor.city}, {donor.country}</div>
                        )}
                      </td>
                      <td className="p-3 text-sm">
                        {donor.email ? (
                          <div>
                            <div>{donor.email}</div>
                            {donor.phone && <div className="text-xs text-slate-400">{donor.phone}</div>}
                          </div>
                        ) : <span className="text-slate-400">—</span>}
                      </td>
                      <td className="p-3 font-bold">
                        {currencySymbol(d.currency)}{Number(d.amount || 0).toLocaleString('fr-FR')}
                      </td>
                      <td className="p-3 text-sm">
                        {d.impact_preset
                          ? <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{d.impact_preset} €</span>
                          : <span className="text-slate-400">libre</span>}
                      </td>
                      <td className="p-3">{getStatusBadge(d.status)}</td>
                      <td className="p-3 font-mono text-xs text-slate-500 break-all max-w-[180px]">
                        {d.paypal_order_id || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [auth, setAuth] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');

  const handleLogout = () => {
    setAuth(null);
    toast.success('Déconnexion réussie');
  };

  if (!auth) {
    return <AdminLogin onLogin={setAuth} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-serif text-xl font-bold text-slate-900">
              Backoffice
            </h1>
            <p className="text-xs text-slate-500">Avec les Patriotes d'Israël</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 border-b-2 transition-colors font-medium ${
                activeTab === 'contacts'
                  ? 'border-fr-blue text-fr-blue'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`py-4 border-b-2 transition-colors font-medium ${
                activeTab === 'donations'
                  ? 'border-fr-blue text-fr-blue'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Dons
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'contacts' && <ContactsTable auth={auth} />}
        {activeTab === 'donations' && <DonationsTable auth={auth} />}
      </main>
    </div>
  );
};

export default Admin;
