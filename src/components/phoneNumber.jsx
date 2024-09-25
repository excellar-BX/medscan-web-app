import React, { useState } from 'react';
import { ErrorMessage } from 'formik';

const PhoneNumberInput = ({ field, form }) => {
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null); // Default to null for world icon

    const countryData = {
       
      Afghanistan: { code: '+93', flag: 'AF' },
      Albania: { code: '+355', flag: 'AL' },
      Algeria: { code: '+213', flag: 'DZ' },
      Andorra: { code: '+376', flag: 'AD' },
      Angola: { code: '+244', flag: 'AO' },
      AntiguaAndBarbuda: { code: '+1-268', flag: 'AG' },
      Argentina: { code: '+54', flag: 'AR' },
      Armenia: { code: '+374', flag: 'AM' },
      Australia: { code: '+61', flag: 'AU' },
      Austria: { code: '+43', flag: 'AT' },
      Azerbaijan: { code: '+994', flag: 'AZ' },
      Bahamas: { code: '+1-242', flag: 'BS' },
      Bahrain: { code: '+973', flag: 'BH' },
      Bangladesh: { code: '+880', flag: 'BD' },
      Barbados: { code: '+1-246', flag: 'BB' },
      Belarus: { code: '+375', flag: 'BY' },
      Belgium: { code: '+32', flag: 'BE' },
      Belize: { code: '+501', flag: 'BZ' },
      Benin: { code: '+229', flag: 'BJ' },
      Bhutan: { code: '+975', flag: 'BT' },
      Bolivia: { code: '+591', flag: 'BO' },
      Bosnia: { code: '+387', flag: 'BA' },
      Botswana: { code: '+267', flag: 'BW' },
      Brazil: { code: '+55', flag: 'BR' },
      Brunei: { code: '+673', flag: 'BN' },
      Bulgaria: { code: '+359', flag: 'BG' },
      BurkinaFaso: { code: '+226', flag: 'BF' },
      Burundi: { code: '+257', flag: 'BI' },
      CaboVerde: { code: '+238', flag: 'CV' },
      Cambodia: { code: '+855', flag: 'KH' },
      Cameroon: { code: '+237', flag: 'CM' },
      Canada: { code: '+1', flag: 'CA' },
      CAR: { code: '+236', flag: 'CF' },
      Chad: { code: '+235', flag: 'TD' },
      Chile: { code: '+56', flag: 'CL' },
      China: { code: '+86', flag: 'CN' },
      Colombia: { code: '+57', flag: 'CO' },
      Comoros: { code: '+269', flag: 'KM' },
      Congo: { code: '+242', flag: 'CG' },
      CostaRica: { code: '+506', flag: 'CR' },
      Croatia: { code: '+385', flag: 'HR' },
      Cuba: { code: '+53', flag: 'CU' },
      Cyprus: { code: '+357', flag: 'CY' },
      CzechRepublic: { code: '+420', flag: 'CZ' },
      DRCongo: { code: '+243', flag: 'CD' },
      Denmark: { code: '+45', flag: 'DK' },
      Djibouti: { code: '+253', flag: 'DJ' },
      Dominica: { code: '+1-767', flag: 'DM' },
      Dopublic: { code: '+1-809', flag: 'DO' },
      EastTimor: { code: '+670', flag: 'TL' },
      Ecuador: { code: '+593', flag: 'EC' },
      Egypt: { code: '+20', flag: 'EG' },
      ElSalvador: { code: '+503', flag: 'SV' },
      EGuinea: { code: '+240', flag: 'GQ' },
      Eritrea: { code: '+291', flag: 'ER' },
      Estonia: { code: '+372', flag: 'EE' },
      Eswatini: { code: '+268', flag: 'SZ' },
      Ethiopia: { code: '+251', flag: 'ET' },
      Fiji: { code: '+679', flag: 'FJ' },
      Finland: { code: '+358', flag: 'FI' },
      France: { code: '+33', flag: 'FR' },
      Gabon: { code: '+241', flag: 'GA' },
      Gambia: { code: '+220', flag: 'GM' },
      Georgia: { code: '+995', flag: 'GE' },
      Germany: { code: '+49', flag: 'DE' },
      Ghana: { code: '+233', flag: 'GH' },
      Greece: { code: '+30', flag: 'GR' },
      Grenada: { code: '+1-473', flag: 'GD' },
      Guatemala: { code: '+502', flag: 'GT' },
      Guinea: { code: '+224', flag: 'GN' },
      GuineaBissau: { code: '+245', flag: 'GW' },
      Guyana: { code: '+592', flag: 'GY' },
      Haiti: { code: '+509', flag: 'HT' },
      Honduras: { code: '+504', flag: 'HN' },
      Hungary: { code: '+36', flag: 'HU' },
      Iceland: { code: '+354', flag: 'IS' },
      India: { code: '+91', flag: 'IN' },
      Indonesia: { code: '+62', flag: 'ID' },
      Iran: { code: '+98', flag: 'IR' },
      Iraq: { code: '+964', flag: 'IQ' },
      Ireland: { code: '+353', flag: 'IE' },
      Israel: { code: '+972', flag: 'IL' },
      Italy: { code: '+39', flag: 'IT' },
      Jamaica: { code: '+1-876', flag: 'JM' },
      Japan: { code: '+81', flag: 'JP' },
      Jordan: { code: '+962', flag: 'JO' },
      Kazakhstan: { code: '+7', flag: 'KZ' },
      Kenya: { code: '+254', flag: 'KE' },
      Kiribati: { code: '+686', flag: 'KI' },
      KoreaNorth: { code: '+850', flag: 'KP' },
      KoreaSouth: { code: '+82', flag: 'KR' },
      Kosovo: { code: '+383', flag: 'XK' },
      Kuwait: { code: '+965', flag: 'KW' },
      Kyrgyzstan: { code: '+996', flag: 'KG' },
      Laos: { code: '+856', flag: 'LA' },
      Latvia: { code: '+371', flag: 'LV' },
      Lebanon: { code: '+961', flag: 'LB' },
      Lesotho: { code: '+266', flag: 'LS' },
      Liberia: { code: '+231', flag: 'LR' },
      Libya: { code: '+218', flag: 'LY' },
      Liechtenstein: { code: '+423', flag: 'LI' },
      Lithuania: { code: '+370', flag: 'LT' },
      Luxembourg: { code: '+352', flag: 'LU' },
      Madagascar: { code: '+261', flag: 'MG' },
      Malawi: { code: '+265', flag: 'MW' },
      Malaysia: { code: '+60', flag: 'MY' },
      Maldives: { code: '+960', flag: 'MV' },
      Mali: { code: '+223', flag: 'ML' },
      Malta: { code: '+356', flag: 'MT' },
      MarshallIs: { code: '+692', flag: 'MH' },
      Mauritania: { code: '+222', flag: 'MR' },
      Mauritius: { code: '+230', flag: 'MU' },
      Mexico: { code: '+52', flag: 'MX' },
      Micronesia: { code: '+691', flag: 'FM' },
      Moldova: { code: '+373', flag: 'MD' },
      Monaco: { code: '+377', flag: 'MC' },
      Mongolia: { code: '+976', flag: 'MN' },
      Montenegro: { code: '+382', flag: 'ME' },
      Morocco: { code: '+212', flag: 'MA' },
      Mozambique: { code: '+258', flag: 'MZ' },
      Myanmar: { code: '+95', flag: 'MM' },
      Namibia: { code: '+264', flag: 'NA' },
      Nauru: { code: '+674', flag: 'NR' },
      Nepal: { code: '+977', flag: 'NP' },
      Netherlands: { code: '+31', flag: 'NL' },
      NewZealand: { code: '+64', flag: 'NZ' },
      Nicaragua: { code: '+505', flag: 'NI' },
      Niger: { code: '+227', flag: 'NE' },
      Nigeria: { code: '+234', flag: 'NG' },
      NorthMacedonia: { code: '+389', flag: 'MK' },
      Norway: { code: '+47', flag: 'NO' },
      Oman: { code: '+968', flag: 'OM' },
      Pakistan: { code: '+92', flag: 'PK' },
      Palau: { code: '+680', flag: 'PW' },
      Panama: { code: '+507', flag: 'PA' },
      Papua: { code: '+675', flag: 'PG' },
      Paraguay: { code: '+595', flag: 'PY' },
      Peru: { code: '+51', flag: 'PE' },
      Philippines: { code: '+63', flag: 'PH' },
      Poland: { code: '+48', flag: 'PL' },
      Portugal: { code: '+351', flag: 'PT' },
      Qatar: { code: '+974', flag: 'QA' },
      Romania: { code: '+40', flag: 'RO' },
      Russia: { code: '+7', flag: 'RU' },
      Rwanda: { code: '+250', flag: 'RW' },
      SaintKitts: { code: '+1-869', flag: 'KN' },
      SaintLucia: { code: '+1-758', flag: 'LC' },
      SaintVincent: { code: '+1-784', flag: 'VC' },
      Samoa: { code: '+685', flag: 'WS' },
      SanMarino: { code: '+378', flag: 'SM' },
      SaoTomeAndPrincipe: { code: '+239', flag: 'ST' },
      SaudiArabia: { code: '+966', flag: 'SA' },
      Senegal: { code: '+221', flag: 'SN' },
      Serbia: { code: '+381', flag: 'RS' },
      Seychelles: { code: '+248', flag: 'SC' },
      SierraLeone: { code: '+232', flag: 'SL' },
      Singapore: { code: '+65', flag: 'SG' },
      Slovakia: { code: '+421', flag: 'SK' },
      Slovenia: { code: '+386', flag: 'SI' },
      SIslands: { code: '+677', flag: 'SB' },
      Somalia: { code: '+252', flag: 'SO' },
      SA: { code: '+27', flag: 'ZA' },
      SouthSudan: { code: '+211', flag: 'SS' },
      Spain: { code: '+34', flag: 'ES' },
      SriLanka: { code: '+94', flag: 'LK' },
      Sudan: { code: '+249', flag: 'SD' },
      Suriname: { code: '+597', flag: 'SR' },
      Sweden: { code: '+46', flag: 'SE' },
      Switzerland: { code: '+41', flag: 'CH' },
      Syria: { code: '+963', flag: 'SY' },
      Taiwan: { code: '+886', flag: 'TW' },
      Tajikistan: { code: '+992', flag: 'TJ' },
      Tanzania: { code: '+255', flag: 'TZ' },
      Thailand: { code: '+66', flag: 'TH' },
      Togo: { code: '+228', flag: 'TG' },
      Tonga: { code: '+676', flag: 'TO' },
      Trinidad: { code: '+1-868', flag: 'TT' },
      Tunisia: { code: '+216', flag: 'TN' },
      Turkey: { code: '+90', flag: 'TR' },
      Turkmenistan: { code: '+993', flag: 'TM' },
      Tuvalu: { code: '+688', flag: 'TV' },
      Uganda: { code: '+256', flag: 'UG' },
      Ukraine: { code: '+380', flag: 'UA' },
      UAE: { code: '+971', flag: 'AE' },
      UK: { code: '+44', flag: 'GB' },
      USA: { code: '+1', flag: 'US' },
      Uruguay: { code: '+598', flag: 'UY' },
      Uzbekistan: { code: '+998', flag: 'UZ' },
      Vanuatu: { code: '+678', flag: 'VU' },
      VaticanCity: { code: '+379', flag: 'VA' },
      Venezuela: { code: '+58', flag: 'VE' },
      Vietnam: { code: '+84', flag: 'VN' },
      Yemen: { code: '+967', flag: 'YE' },
      Zambia: { code: '+260', flag: 'ZM' },
      Zimbabwe: { code: '+263', flag: 'ZW' }
        // Add more countries as needed
    }; 

    const handleCountrySelect = (country) => {
        const selectedData = countryData[country];
        const selectedCode = selectedData.code;
        setCountryCode(selectedCode);
        setSelectedCountry(country);
        setShowDropdown(false);

        // Update phone number input with new country code
        if (phoneNumber && !phoneNumber.startsWith(selectedCode)) {
            const updatedPhoneNumber = phoneNumber.replace(/^\+\d+/, selectedCode); // Replace old code with new one
            setPhoneNumber(updatedPhoneNumber);
            form.setFieldValue(field.name, updatedPhoneNumber);
        } else {
            form.setFieldValue(field.name, selectedCode + phoneNumber.replace(/^\+\d+/, ''));
        }
    };

    const handlePhoneNumberChange = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        form.setFieldValue(field.name, countryCode + newPhoneNumber);
    };

    return (
      <div className="relative border border-gray-300 rounded-lg w-full">
        <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
          Phone Number
        </label>
        <div className="flex items-center">
          {/* Country flag icon */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-2 py-2 bg-transparent border-none outline-none cursor-pointer"
            >
              {selectedCountry ? (
                <img
                  src={`https://flagcdn.com/48x36/${countryData[selectedCountry].flag.toLowerCase()}.png`}
                  alt={`${selectedCountry} flag`}
                  className="w-6 h-4 mr-2"
                />
              ) : (
                <img
                  src="https://flagcdn.com/48x36/gl.png" // World icon
                  alt="World icon"
                  className="w-6 h-4 mr-2"
                />
              )}
            </button>
            {/* Dropdown list of countries */}
            {showDropdown && (
              <ul className="absolute z-10  border border-gray-300 mt-2 max-h-40 overflow-y-auto w-[300px] bg-blue-400">
                {Object.keys(countryData).map((country) => (
                  <li
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center px-2 py-1 hover:bg-gray-200 cursor-pointer"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${countryData[country].flag.toLowerCase()}.png`}
                      alt={`${country} flag`}
                      className="w-4 h-3 mr-2"
                    />
                    {country} ({countryData[country].code})
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Phone number input */}
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder={selectedCountry ? `${countryCode} Enter your phone number` : 'Enter your phone number'}
            className="w-full px-4 py-2 bg-transparent border-none outline-none"
          />
        </div>
        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
      </div>
    );
};

export default PhoneNumberInput;



