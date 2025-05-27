import React, { useState, useEffect } from 'react';
import { ArrowLeft, LogOut, Mail, Phone, HelpCircle, ExternalLink, Star, Percent } from 'lucide-react';

const MultiparkApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('dashboard-multipark.pt');

  // Mapeamento de emails para parceiros
  const emailToPartner = {
    'azulviajante@gmail.com': 'AzulViajante',
    'evora@besttravel.com': 'Bestravel Évora',
    'castelobranco@besttravel.com': 'Bestravel Castelo Branco'
  };

  // Dados dos parceiros com os URLs reais
  const partnersData = {
    'AzulViajante': {
      name: 'AzulViajante',
      commission: null,
      paymentTerms: null,
      preferredBrand: null,
      campaigns: {
        'Lisboa': {
          'Airpark': 'https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=6uRF1X1oPyj0A7xWI7vQ',
          'Redpark': 'https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=ZOJniuQ4WvDtOUU8HfbV',
          'Skypark': 'https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=wmbK3LocmDBZ6yrBdCHJ'
        },
        'Faro': {
          'Airpark': 'https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=LQgTapmlBytbekLcAz7i',
          'Redpark': 'https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=OgfX2bzqLtPSMHUiIr4u',
          'Skypark': 'https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=CKwODzBSNTfszUMNpB3q'
        },
        'Porto': {
          'Airpark': 'https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=65COcZcF4R2F4WIDSIGr',
          'Redpark': 'https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=dbgvKQKxaBkAHJcwk7pE',
          'Skypark': 'https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=GWVhYLhtzYaVfzLEiTHu'
        }
      }
    },
    'Bestravel Castelo Branco': {
      name: 'Bestravel Castelo Branco',
      commission: '20,00%',
      paymentTerms: 'Final do mês',
      preferredBrand: 'Airpark',
      campaigns: {
        'Lisboa': {
          'Airpark': 'https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=Br3FO5nO4rJb504WSd1I',
          'Redpark': 'https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=fpQUZRuJmhtrhNZi9cC1',
          'Skypark': 'https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=3ecZnocAw46EhChtrEXe'
        },
        'Faro': {
          'Airpark': 'https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=UNjTBKor29YrnIegmShz',
          'Redpark': 'https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=fi8IkvWRxtzZYvZxiMNT',
          'Skypark': 'https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=3E5sktFqMq0U6pRrC8JG'
        },
        'Porto': {
          'Airpark': 'https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=oWVc5iw5iWAWWFlan62N',
          'Redpark': 'https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=BP9cNdiMRsQbKmscNCvr',
          'Skypark': 'https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=Ge10ESRQVsOSEh5H6gox'
        }
      }
    },
    'Bestravel Évora': {
      name: 'Bestravel Évora',
      commission: '20,00%',
      paymentTerms: 'Final do mês',
      preferredBrand: 'Airpark',
      campaigns: {
        'Lisboa': {
          'Airpark': 'https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=8oDttn5JdJWNqKAWXbzZ',
          'Redpark': 'https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=i5ZJ4rGv9p4HG79GvO1y',
          'Skypark': 'https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=cG8y7I1gls2IqtqpRlXg'
        },
        'Faro': {
          'Airpark': 'https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=maSnolZAZBuK3ebq5Z8w',
          'Redpark': 'https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=qbji69M37F7AfzSf7ttK',
          'Skypark': 'https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=qnsyRLppI7IMXOiuIhIw'
        },
        'Porto': {
          'Airpark': 'https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=UJICS7A5GyyL1o0aYiiJ',
          'Redpark': 'https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=jgBMDpkk1zD9vn7KsEKk',
          'Skypark': 'https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=aPIx5AwAHHFJmZ0ObPcc'
        }
      }
    }
  };

  // Simular mudança de URL
  useEffect(() => {
    if (user && currentPage !== 'login') {
      const username = user.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      setCurrentUrl(`${username}.dashboard-multipark.pt`);
    } else {
      setCurrentUrl('dashboard-multipark.pt');
    }
  }, [user, currentPage]);

  // Componente para mostrar URL atual
  const UrlBar = () => (
    <div className="bg-gray-800 text-white px-4 py-2 text-sm font-mono">
      🌐 {currentUrl}
    </div>
  );

  // Componente de Login
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleLogin = () => {
      if (email && password) {
        // Verificar se o email está associado a um parceiro
        const partnerKey = emailToPartner[email.toLowerCase()];
        if (partnerKey) {
          setIsRedirecting(true);
          setTimeout(() => {
            setUser(email);
            setSelectedPartner(partnerKey);
            setCurrentPage('dashboard');
            setIsRedirecting(false);
          }, 2000);
        } else {
          alert('Email não autorizado. Contacte o administrador para obter acesso.');
        }
      }
    };

    if (isRedirecting) {
      const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      const partnerName = emailToPartner[email.toLowerCase()] ? partnersData[emailToPartner[email.toLowerCase()]].name : 'Utilizador';
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <div className="bg-blue-900 text-white px-6 py-3 rounded-lg inline-block mb-4">
              <span className="text-xl font-bold">P MULTIPARK</span>
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">A redirecionar...</h2>
            <p className="text-gray-600 mb-2">
              A encaminhar para o painel de <strong>{partnerName}</strong>
            </p>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-700 font-mono">
                {username}.dashboard-multipark.pt
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <UrlBar />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center mb-8">
              <div className="bg-blue-900 text-white px-6 py-3 rounded-lg inline-block mb-4">
                <span className="text-xl font-bold">P MULTIPARK</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Plataforma de Afiliados</h2>
              <p className="text-gray-600 text-sm mt-2">dashboard-multipark.pt</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="seu.email@exemplo.com"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavra-passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 font-medium"
              >
                Entrar na Plataforma
              </button>
              
              <div className="text-xs text-gray-400 text-center mt-4 p-3 bg-gray-50 rounded border">
                <p className="font-medium mb-2">Emails Autorizados:</p>
                <div className="space-y-1">
                  <p>• azulviajante@gmail.com (AzulViajante)</p>
                  <p>• evora@besttravel.com (Bestravel Évora)</p>
                  <p>• castelobranco@besttravel.com (Bestravel Castelo Branco)</p>
                </div>
              </div>
              
              {email && emailToPartner[email.toLowerCase()] && (
                <div className="text-xs text-gray-500 text-center mt-4 p-2 bg-green-50 border border-green-200 rounded">
                  ✅ Email autorizado para: <strong>{partnersData[emailToPartner[email.toLowerCase()]].name}</strong><br/>
                  Será redirecionado para: <strong>{email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.dashboard-multipark.pt</strong>
                </div>
              )}
              
              {email && !emailToPartner[email.toLowerCase()] && email.includes('@') && (
                <div className="text-xs text-red-500 text-center mt-4 p-2 bg-red-50 border border-red-200 rounded">
                  ❌ Email não autorizado. Contacte o administrador.
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  // Componente do Painel Principal
  const Dashboard = () => {
    const currentPartner = partnersData[selectedPartner];
    
    return (
      <>
        <UrlBar />
        <div className="min-h-screen bg-gray-100">
          <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="bg-blue-900 text-white px-6 py-2 rounded-lg">
                <span className="text-xl font-bold">P MULTIPARK</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{currentPartner.name}</span>
                  {currentPartner.commission && (
                    <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {currentPartner.commission}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setUser(null);
                    setSelectedPartner(null);
                    setCurrentPage('login');
                  }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={20} />
                  Sair
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Painel de {currentPartner.name}
              </h1>
              <p className="text-gray-600">Selecione a cidade para gerar links de afiliado</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                  Cidades Disponíveis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Lisboa', 'Porto', 'Faro'].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCurrentPage('city');
                      }}
                      className="bg-blue-50 border-2 border-blue-300 text-blue-700 py-4 px-6 rounded-lg hover:bg-blue-100 transition duration-200 font-medium text-lg"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-100 transition duration-200">
                  <HelpCircle size={48} className="text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Dúvidas</h3>
                  <p className="text-blue-600 text-sm">
                    Precisa de ajuda com os seus links de afiliado?
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-100 transition duration-200">
                  <Phone size={48} className="text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Contacto</h3>
                  <p className="text-blue-600 text-sm">
                    Entre em contacto com a equipa de afiliados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Componente da Página da Cidade
  const CityPage = () => {
    const currentPartner = partnersData[selectedPartner];
    
    const handleBrandClick = (brand) => {
      const targetUrl = currentPartner.campaigns[selectedCity][brand];
      window.open(targetUrl, '_blank');
    };

    const copyToClipboard = (brand) => {
      const url = currentPartner.campaigns[selectedCity][brand];
      navigator.clipboard.writeText(url).then(() => {
        alert(`Link copiado para clipboard:\n${url}`);
      });
    };

    return (
      <>
        <UrlBar />
        <div className="min-h-screen bg-gray-100">
          <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="bg-blue-900 text-white px-6 py-2 rounded-lg">
                <span className="text-xl font-bold">P MULTIPARK</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={20} />
                  Voltar
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    setSelectedPartner(null);
                    setSelectedCity(null);
                    setCurrentPage('login');
                  }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedCity} - {currentPartner.name}
              </h1>
              <p className="text-gray-600">Clique para abrir o link de afiliado ou copiar para clipboard</p>
              {currentPartner.preferredBrand && (
                <div className="flex items-center justify-center gap-1 text-yellow-600 mt-2">
                  <Star size={16} />
                  <span className="text-sm">Marca Preferida: {currentPartner.preferredBrand}</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                  Links de Afiliado - {selectedCity}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {['Airpark', 'Redpark', 'Skypark'].map((service) => {
                    const isPreferred = currentPartner.preferredBrand === service;
                    return (
                      <div 
                        key={service} 
                        className={`border-2 rounded-lg p-6 text-center transition duration-200 cursor-pointer relative group ${
                          isPreferred 
                            ? 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100' 
                            : 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                        }`}
                      >
                        {isPreferred && (
                          <div className="absolute top-2 right-2">
                            <Star size={16} className="text-yellow-500 fill-current" />
                          </div>
                        )}
                        
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">Logo {service}</span>
                        </div>
                        
                        <h3 className={`text-lg font-semibold mb-3 ${
                          isPreferred ? 'text-yellow-700' : 'text-blue-700'
                        }`}>
                          {service}
                        </h3>
                        
                        <div className="space-y-2">
                          <button
                            onClick={() => handleBrandClick(service)}
                            className={`w-full py-2 px-4 rounded-md text-sm font-medium transition duration-200 ${
                              isPreferred
                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            Abrir Link
                          </button>
                          
                          <button
                            onClick={() => copyToClipboard(service)}
                            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
                          >
                            Copiar URL
                          </button>
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={12} className="inline mr-1" />
                          multipark.pt/book
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Todos os links incluem o seu campaignId único para tracking de comissões
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                  Informações
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Preçário', icon: '€', desc: 'Ver tabela de preços' },
                    { name: 'Relatórios', icon: '📊', desc: 'Estatísticas de cliques' },
                    { name: 'Suporte', icon: '📞', desc: 'Contactar equipa' }
                  ].map((item) => (
                    <button
                      key={item.name}
                      className="bg-blue-50 border-2 border-blue-300 text-blue-700 py-4 px-6 rounded-lg hover:bg-blue-100 transition duration-200 font-medium"
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <div className="text-base mb-1">{item.name}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Renderização baseada na página atual
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'city':
        return <CityPage />;
      default:
        return <LoginPage />;
    }
  };

  return renderPage();
};

export default MultiparkApp;
