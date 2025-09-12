import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  DollarSign, 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Building2, 
  Home, 
  Store,
  Mail,
  Calendar as CalendarIcon,
  Hash,
  Info
} from "lucide-react";

const TenantInfoPage = ({ tenant }) => {
  if (!tenant) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
        >
          <Info className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold">Kiracı Bilgileri Bulunamadı</p>
        </motion.div>
      </div>
    );
  }

  const infoCards = [
    {
      title: "Kişisel Bilgiler",
      icon: User,
      color: "blue",
      items: [
        {
          label: "Ad Soyad",
          value: `${tenant.tenant_name} ${tenant.tenant_surname}`,
          icon: User
        },
        {
          label: "Telefon",
          value: tenant.tenant_phone || "Belirtilmemiş",
          icon: Phone
        },
        {
          label: "E-posta",
          value: tenant.email || "Belirtilmemiş",
          icon: Mail
        }
      ]
    },
    {
      title: "Mülk Bilgileri",
      icon: Building2,
      color: "purple",
      items: [
        {
          label: "Mülk Tipi",
          value: tenant.type === 1 ? "Konut" : "İşyeri",
          icon: tenant.type === 1 ? Home : Store
        },
        {
          label: "Adres",
          value: tenant.tenant_address || "Belirtilmemiş",
          icon: MapPin
        },
        {
          label: "Kira Tutarı",
          value: `${tenant.rent_amount?.toLocaleString('tr-TR')} ₺`,
          icon: DollarSign
        }
      ]
    },
    {
      title: "Sözleşme Bilgileri",
      icon: FileText,
      color: "green",
      items: [
        {
          label: "Sözleşme Süresi",
          value: `${tenant.contract_duration || 12} ay`,
          icon: Clock
        },
        {
          label: "Başlangıç Tarihi",
          value: tenant.start_date?.slice(0, 10) || "Belirtilmemiş",
          icon: CalendarIcon
        },
        {
          label: "Bitiş Tarihi",
          value: tenant.start_date ? 
            new Date(new Date(tenant.start_date).setMonth(new Date(tenant.start_date).getMonth() + (tenant.contract_duration || 12))).toISOString().slice(0, 10) : 
            "Belirtilmemiş",
          icon: Calendar
        }
      ]
    },
    {
      title: "Ek Bilgiler",
      icon: Info,
      color: "orange",
      items: [
        {
          label: "Açıklama",
          value: tenant.description || "Açıklama bulunmuyor",
          icon: FileText
        },
        {
          label: "Kiracı ID",
          value: `#${tenant.tenant_id || "N/A"}`,
          icon: Hash
        }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-600",
        title: "text-blue-800",
        card: "from-blue-500 to-blue-600"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "text-purple-600",
        title: "text-purple-800",
        card: "from-purple-500 to-purple-600"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-600",
        title: "text-green-800",
        card: "from-green-500 to-green-600"
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        icon: "text-orange-600",
        title: "text-orange-800",
        card: "from-orange-500 to-orange-600"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <User className="w-8 h-8 text-blue-600" />
          Kiracı Bilgileri
        </h2>
        <p className="text-gray-600">Detaylı kiracı bilgilerini görüntüleyin</p>
      </motion.div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {infoCards.map((card, cardIndex) => {
          const Icon = card.icon;
          const colors = getColorClasses(card.color);
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: cardIndex * 0.1 }}
              className={`${colors.bg} ${colors.border} border rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${colors.card} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${colors.title}`}>
                  {card.title}
                </h3>
              </div>

              {/* Card Items */}
              <div className="space-y-4">
                {card.items.map((item, itemIndex) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (cardIndex * 0.1) + (itemIndex * 0.05) }}
                      className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300"
                    >
                      <div className={`p-2 rounded-xl ${colors.bg} flex-shrink-0`}>
                        <ItemIcon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-600 mb-1">
                          {item.label}
                        </p>
                        <p className={`text-gray-800 font-medium break-words ${item.label === 'Açıklama' ? 'text-sm' : ''}`}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Özet Bilgiler</h3>
            <p className="text-blue-100">Kiracının genel durumu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-blue-100">Aylık Kira</span>
            </div>
            <p className="text-2xl font-bold">{tenant.rent_amount?.toLocaleString('tr-TR')} ₺</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-blue-100">Sözleşme Süresi</span>
            </div>
            <p className="text-2xl font-bold">{tenant.contract_duration || 12} ay</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-blue-100">Başlangıç</span>
            </div>
            <p className="text-lg font-bold">{tenant.start_date?.slice(0, 10) || "Belirtilmemiş"}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TenantInfoPage;
