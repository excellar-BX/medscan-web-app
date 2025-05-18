import React, { useState } from 'react';
import {  ErrorMessage } from 'formik';


const PhoneNumberInput = ({ field, form }) => {
    const [countryCode, setCountryCode] = useState('+234');
    const [phoneNumber, setPhoneNumber] = useState('');

    const countryCodes = {
      
    Afghanistan: '+93',
    Albania: '+355',
    Algeria: '+213',
    Andorra: '+376',
    Angola: '+244',
    AntiguaAndBarbuda: '+1-268',
    Argentina: '+54',
    Armenia: '+374',
    Australia: '+61',
    Austria: '+43',
    Azerbaijan: '+994',
    Bahamas: '+1-242',
    Bahrain: '+973',
    Bangladesh: '+880',
    Barbados: '+1-246',
    Belarus: '+375',
    Belgium: '+32',
    Belize: '+501',
    Benin: '+229',
    Bhutan: '+975',
    Bolivia: '+591',
    Bosnia: '+387',
    Botswana: '+267',
    Brazil: '+55',
    Brunei: '+673',
    Bulgaria: '+359',
    BurkinaFaso: '+226',
    Burundi: '+257',
    CaboVerde: '+238',
    Cambodia: '+855',
    Cameroon: '+237',
    Canada: '+1',
    CAR: '+236',
    Chad: '+235',
    Chile: '+56',
    China: '+86',
    Colombia: '+57',
    Comoros: '+269',
    Congo: '+242',
    CostaRica: '+506',
    Croatia: '+385',
    Cuba: '+53',
    Cyprus: '+357',
    CzechRepublic: '+420',
    DRCongo: '+243',
    Denmark: '+45',
    Djibouti: '+253',
    Dominica: '+1-767',
    Dopublic: '+1-809',
    EastTimor: '+670',
    Ecuador: '+593',
    Egypt: '+20',
    ElSalvador: '+503',
    EGuinea: '+240',
    Eritrea: '+291',
    Estonia: '+372',
    Eswatini: '+268',
    Ethiopia: '+251',
    Fiji: '+679',
    Finland: '+358',
    France: '+33',
    Gabon: '+241',
    Gambia: '+220',
    Georgia: '+995',
    Germany: '+49',
    Ghana: '+233',
    Greece: '+30',
    Grenada: '+1-473',
    Guatemala: '+502',
    Guinea: '+224',
    GuineaBissau: '+245',
    Guyana: '+592',
    Haiti: '+509',
    Honduras: '+504',
    Hungary: '+36',
    Iceland: '+354',
    India: '+91',
    Indonesia: '+62',
    Iran: '+98',
    Iraq: '+964',
    Ireland: '+353',
    Israel: '+972',
    Italy: '+39',
    Jamaica: '+1-876',
    Japan: '+81',
    Jordan: '+962',
    Kazakhstan: '+7',
    Kenya: '+254',
    Kiribati: '+686',
    KoreaNorth: '+850',
    KoreaSouth: '+82',
    Kosovo: '+383',
    Kuwait: '+965',
    Kyrgyzstan: '+996',
    Laos: '+856',
    Latvia: '+371',
    Lebanon: '+961',
    Lesotho: '+266',
    Liberia: '+231',
    Libya: '+218',
    Liechtenstein: '+423',
    Lithuania: '+370',
    Luxembourg: '+352',
    Madagascar: '+261',
    Malawi: '+265',
    Malaysia: '+60',
    Maldives: '+960',
    Mali: '+223',
    Malta: '+356',
    MarshallIs: '+692',
    Mauritania: '+222',
    Mauritius: '+230',
    Mexico: '+52',
    Micronesia: '+691',
    Moldova: '+373',
    Monaco: '+377',
    Mongolia: '+976',
    Montenegro: '+382',
    Morocco: '+212',
    Mozambique: '+258',
    Myanmar: '+95',
    Namibia: '+264',
    Nauru: '+674',
    Nepal: '+977',
    Netherlands: '+31',
    NewZealand: '+64',
    Nicaragua: '+505',
    Niger: '+227',
    Nigeria: '+234',
    NorthMacedonia: '+389',
    Norway: '+47',
    Oman: '+968',
    Pakistan: '+92',
    Palau: '+680',
    Panama: '+507',
    Papua: '+675',
    Paraguay: '+595',
    Peru: '+51',
    Philippines: '+63',
    Poland: '+48',
    Portugal: '+351',
    Qatar: '+974',
    Romania: '+40',
    Russia: '+7',
    Rwanda: '+250',
    SaintKitts: '+1-869',
    SaintLucia: '+1-758',
    SaintVincent: '+1-784',
    Samoa: '+685',
    SanMarino: '+378',
    SaoTomeAndPrincipe: '+239',
    SaudiArabia: '+966',
    Senegal: '+221',
    Serbia: '+381',
    Seychelles: '+248',
    SierraLeone: '+232',
    Singapore: '+65',
    Slovakia: '+421',
    Slovenia: '+386',
    SIslands: '+677',
    Somalia: '+252',
    SA: '+27',
    SouthSudan: '+211',
    Spain: '+34',
    SriLanka: '+94',
    Sudan: '+249',
    Suriname: '+597',
    Sweden: '+46',
    Switzerland: '+41',
    Syria: '+963',
    Taiwan: '+886',
    Tajikistan: '+992',
    Tanzania: '+255',
    Thailand: '+66',
    Togo: '+228',
    Tonga: '+676',
    Trinidad: '+1-868',
    Tunisia: '+216',
    Turkey: '+90',
    Turkmenistan: '+993',
    Tuvalu: '+688',
    Uganda: '+256',
    Ukraine: '+380',
    UAE: '+971',
    UK: '+44',
    USA: '+1',
    Uruguay: '+598',
    Uzbekistan: '+998',
    Vanuatu: '+678',
    VaticanCity: '+379',
    Venezuela: '+58',
    Vietnam: '+84',
    Yemen: '+967',
    Zambia: '+260',
    Zimbabwe: '+263'

    };

    const handleCountryChange = (e) => {
      const selectedCountry = e.target.value;
      const code = countryCodes[selectedCountry] || '';
      setCountryCode(code);
      // Update phoneNumber state and Formik field with the new country code, removing hyphens
      let cleanedPhoneNumber = phoneNumber.replace(/[-\s]/g, ''); // Remove hyphens and spaces
      if (!cleanedPhoneNumber.startsWith(code)) {
          const updatedPhoneNumber = code + cleanedPhoneNumber.replace(/^\+\d+\s*/, ''); // Remove old country code if present
          setPhoneNumber(updatedPhoneNumber);
          form.setFieldValue(field.name, updatedPhoneNumber);
      }
  };
  
  const handlePhoneNumberChange = (e) => {
      const newPhoneNumber = e.target.value;
      let cleanedPhoneNumber = newPhoneNumber.replace(/[-\s]/g, ''); // Remove hyphens and spaces
      setPhoneNumber(cleanedPhoneNumber);
      // Update Formik field value with the new phone number (country code + cleaned phone number)
      form.setFieldValue(field.name, countryCode + cleanedPhoneNumber);
  };

    return (
        <div className="relative border border-gray-300 rounded-lg">
        <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
          Business Phone Number
        </label>
        <div className="flex">
          <select
            onChange={handleCountryChange}
            className="px-2 py-2 bg-transparent border-r-0 border-none outline-none rounded-l-lg focus:outline-none"
            value={Object.keys(countryCodes).find(country => countryCodes[country] === countryCode) || ''}
          >
            {Object.keys(countryCodes).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your Phone Number"
            className="w-full px-4 py-2 bg-transparent border-none outline-none rounded-r-lg"
          />
        </div>
        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
      </div>
      
    );
};

export default PhoneNumberInput;
