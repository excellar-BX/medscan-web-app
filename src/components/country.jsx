import React, { useState } from 'react';

// Sample data structure with countries and their states
export const countriesStates = {
    Nigeria: ['Abuja', 'Lagos', 'Kano', 'Rivers', 'Enugu', 'Kaduna', 'Oyo', 'Anambra', 'Ekiti', 'Benue', 'Kogi', 'Imo', 'Ebonyi', 'Delta', 'Adamawa', 'Bauchi', 'Yobe', 'Taraba', 'Gombe', 'Zamfara', 'Sokoto', 'Niger', 'Kwara', 'Ogun', 'Ondo', 'Osun', 'Borno'],
    USA: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
    SA: ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'],
    Egypt: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Port Said', 'Suez', 'Dakahlia', 'Damietta', 'Monufia', 'Sharqia', 'Kafr El Sheikh', 'Beheira', 'Qalyubia', 'Gharbia', 'Beni Suef', 'Minya', 'Asyut', 'Sohag', 'Qena', 'New Valley', 'Red Sea'],
    China: ['Beijing', 'Shanghai', 'Tianjin', 'Chongqing', 'Guangdong', 'Hong Kong', 'Macau', 'Jiangsu', 'Zhejiang', 'Fujian', 'Anhui', 'Jiangxi', 'Shandong', 'Henan', 'Hubei', 'Hunan', 'Guizhou', 'Yunnan', 'Sichuan', 'Shaanxi', 'Gansu', 'Ningxia', 'Xinjiang', 'Xizang (Tibet)', 'Liaoning', 'Heilongjiang', 'Hainan'],
    Japan: ['Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima', 'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara', 'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'],
    Germany: ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
    France: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte ', 'dAzur'],
    Canada: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'],
    Brazil: ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'],
    Argentina: ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
    Algeria: ['Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M’sila', 'Mascara', 'El Bayadh', 'El Oued', 'El Tarf', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Madher', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'],
    Kenya: ['Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kerugoya', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kisumu', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang’a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans-Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'West Pokot'],
    Morocco: ['Agadir-Ida Ou Tanane', 'Casablanca-Settat', 'Fès-Meknès', 'Rabat-Salé-Kénitra', 'Souss-Massa', 'Tanger-Tétouan-Al Hoceïma', 'Béni Mellal-Khénifra', 'Draa-Tafilalet', 'Guelmim-Oued Noun', 'Laâyoune-Sakia El Hamra', 'Ouarzazate', 'Oujda', 'Rabat'],
    Ghana: ['Greater Accra', 'Western', 'Central', 'Eastern', 'Northern', 'Western North', 'Volta', 'Ashanti', 'Western North', 'Upper East', 'Upper West', 'Oti'],
    Tanzania: ['Dodoma', 'Arusha', 'Dar es Salaam', 'Geita', 'Kagera', 'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Singida', 'Tabora', 'Tanga', 'Zanzibar'],
    South_Korea: ['Seoul', 'Busan', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon', 'Chungbuk', 'Chungnam', 'Jeonbuk', 'Jeonnam', 'Gyeongbuk', 'Gyeongnam', 'Jeju'],
    Saudi_Arabia: ['Riyadh', 'Makkah', 'Madina', 'Qassim', 'Eastern Province', 'Asir', 'Tabuk', 'Hail', 'Jizan', 'Najran', 'Al-Baha', 'Northern Borders', 'Al-Jouf'],
    UAE: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al-Quwain', 'Fujairah', 'Ras Al Khaimah'],
    Israel: ['Jerusalem', 'Tel Aviv', 'Haifa', 'Ashdod', 'Beersheba', 'Rishon Lezion', 'Petah Tikva', 'Netanya', 'Hadera', 'Eilat', 'Modi’in-Maccabim-Re’ut', 'Nazareth', 'Ramat Gan', 'Bat Yam', 'Herzliya', 'Kfar Saba'],
    Italy: ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Sardinia', 'Sicily', 'Tuscany', 'Trentino-Alto Adige', 'Umbria', 'Veneto'],
    Spain: ['Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Canary Islands', 'Cantabria', 'Castile and León', 'Castile-La Mancha', 'Catalonia', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarre', 'La Rioja'],
    Portugal: ['Lisbon', 'Porto', 'Braga', 'Aveiro', 'Coimbra', 'Évora', 'Faro', 'Madeira', 'Azores'],
    Mexico: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico State', 'Mexico City', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    Cuba: ['Havana', 'Pinar del Río', 'Artemisa', 'Mayabeque', 'Matanzas', 'Cienfuegos', 'Villa Clara', 'Sancti Spíritus', 'Ciego de Ávila', 'Camagüey', 'Las Tunas', 'Granma', 'Holguín', 'Santiago de Cuba', 'Guantánamo'],
    Jamaica: ['Kingston', 'Saint Andrew', 'Saint Catherine', 'Clarendon', 'Manchester', 'Saint Elizabeth', 'Saint Ann', 'Saint Mary', 'Saint Thomas', 'Portland', 'Trelawny', 'Hanover', 'Westmoreland'],
    Colombia: ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Guajira', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'],
    Peru: ['Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Lima Provincias', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'],
    Chile: ['Arica and Parinacota', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana de Santiago', 'O’Higgins', 'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'],
    Pakistan: ['Azad Kashmir', 'Balochistan', 'Federal Islamabad', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh'],
    Nepal: ['Bagmati', 'Gandaki', 'Karnali', 'Lumbini', 'Mahakali', 'Mechi', 'Narayani', 'Rapti', 'Sagarmatha', 'Seti', 'Province No. 1', 'Province No. 2', 'Province No. 3', 'Province No. 4', 'Province No. 5', 'Province No. 6', 'Province No. 7'],
    Thailand: ['Bangkok', 'Chiang Mai', 'Chiang Rai', 'Chonburi', 'Kanchanaburi', 'Khon Kaen', 'Lampang', 'Loei', 'Nakhon Nayok', 'Nakhon Ratchasima', 'Nakhon Sawan', 'Nakhon Si Thammarat', 'Nan', 'Pattani', 'Phayao', 'Phetchabun', 'Phetchaburi', 'Phitsanulok', 'Phrae', 'Phuket', 'Roi Et', 'Sa Kaeo', 'Sakon Nakhon', 'Samut Prakan', 'Samut Sakhon', 'Samut Songkhram', 'Saraburi', 'Satun', 'Sing Buri', 'Sukhothai', 'Suphan Buri', 'Surat Thani', 'Surin', 'Tak', 'Trang', 'Trat', 'Ubon Ratchathani', 'Udon Thani', 'Uthai Thani', 'Uttaradit', 'Yala', 'Yasothon'],
    UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    Netherlands: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen', 'Haarlem', 'Maastricht', 'Nijmegen', 'Arnhem', 'Dordrecht', 'Leiden', 'Zwolle', 'Almere', 'Hilversum', 'Leeuwarden', 'Den Bosch'],
    Uruguay: ['Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo', 'Paysandú', 'Rio Negro', 'Rivera', 'Rocha', 'Salto', 'San José', 'San Salvador', 'Soriano', 'Tacuarembó', 'Treinta y Tres'],
    Australia: ['New South Wales', 'Victoria', 'Queensland', 'South Australia', 'Western Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
    NewZealand: ['Auckland', 'Bay of Plenty', 'Canterbury', 'Gisborne', 'Hawke,sBay', 'Manawatū-Whanganui', 'Marlborough', 'Nelson', 'Northland', 'Otago', 'Southland', 'Taranaki', 'Tasman', 'Waikato', 'Wellington'],
    Ethiopia: ['Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa', 'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali', 'Southern Nations', 'Tigray'],
    Fiji: ['Central', 'Eastern', 'Northern', 'Western'],
    PNG: ['Central', 'Chimbu', 'East New Britain', 'East Sepik', 'Enga', 'Eastern Highlands', 'Gulf', 'Hela', 'Jiwaka', 'Madang', 'Manus', 'Milne Bay', 'Morobe', 'National Capital District', 'New Ireland', 'Oro', 'Southern Highlands', 'West New Britain', 'West Sepik', 'Western'],
    Tunisia: ['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sfax', 'Sousse', 'Kairouan', 'Kasserine', 'Kébili', 'Gabès', 'Mednine', 'Tataouine', 'Jendouba', 'Le Kef', 'Siliana', 'Zaghouan', 'Nabeul', 'Mahdia'],
    Belgium: ['Antwerp', 'Brussels-Capital', 'East Flanders', 'Flemish Brabant', 'Hainaut', 'Liège', 'Limburg', 'Luxembourg', 'Namur', 'Walloon Brabant'],
    Switzerland: ['Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Bern', 'Fribourg', 'Geneva', 'Glarus', 'Graubünden', 'Jura', 'Lucerne', 'Neuchâtel', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz', 'Solothurn', 'St. Gallen', 'Thurgau', 'Ticino', 'Uri', 'Valais', 'Vaud', 'Zug', 'Zurich'],
    DominicanRepublic: ['Azua', 'Baoruco', 'Barahona', 'Dajabón', 'Distrito Nacional', 'Duarte', 'Elias Piña', 'El Seibo', 'Espaillat', 'La Altagracia', 'La Romana', 'La Vega', 'Monsenor Nouel', 'Monte Cristi', 'Monte Plata', 'Pedernales', 'Peravia', 'Puerto Plata', 'Samaná', 'San Cristóbal', 'San José de Ocoa', 'San Juan', 'San Pedro de Macorís', 'Sánchez Ramírez', 'Santiago', 'Santiago Rodríguez', 'Santo Domingo', 'Valverde'],
    Guatemala: ['Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'El Progreso', 'Escuintla', 'Guatemala', 'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché', 'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Solalá', 'Suchitepéquez', 'Totonicapán', 'Zacapa'],
    Bolivia: ['Chuquisaca', 'Cochabamba', 'Colcha', 'La Paz', 'Oruro', 'Pando', 'Potosí', 'Santa Cruz', 'Tarija', 'Beni', 'Guayaramerín'],
    Vanuatu: ['Shefa', 'Sanma', 'Malampa', 'Penama', 'Tafea', 'Torba'],
    SolomonIslands: ['Central', 'Choiseul', 'Guadalcanal', 'Honiara', 'Isabel', 'Makira-Ulawa', 'Malaita', 'Rennell and Bellona', 'Temotu'],
    Iran: ['Alborz', 'Ardabil', 'Bushehr', 'Chaharmahal and Bakhtiari', 'East Azerbaijan', 'Fars', 'Gilan', 'Golestan', 'Hamadan', 'Hormozgan', 'Ilam', 'Isfahan', 'Kerman', 'Kermanshah', 'Khuzestan', 'Kohgiluyeh and Boyer-Ahmad', 'Kurdistan', 'Lorestan', 'Markazi', 'Mazandaran', 'North Khorasan', 'Qazvin', 'Qom', 'Razavi Khorasan', 'Semnan', 'Sistan and Baluchestan', 'South Khorasan', 'Tehran', 'Yazd', 'Zanjan'],
    Turkey: ['Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'],
    Montenegro: ['Bar', 'Berane', 'Bijelo Polje', 'Budva', 'Cetinje', 'Herceg Novi', 'Kolašin', 'Nikšić', 'Plav', 'Pljevlja', 'Rožaje', 'Tivat', 'Ulcinj'],
    Uganda: ['Central Region', 'Eastern Region', 'Northern Region', 'Western Region'],
    Vietnam: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho', 'Hue', 'Vinh', 'Nha Trang', 'Da Lat', 'Rach Gia', 'Thanh Hoa', 'Nam Dinh', 'Quang Ngai'],
    Estonia: ['Harju', 'Tartu', 'Pärnu', 'Ida-Viru', 'Lääne-Viru', 'Viljandi', 'Jõgeva', 'Lääne', 'Saare', 'Valga', 'Võru'],
    Latvia: ['Riga', 'Liepaja', 'Daugavpils', 'Jelgava', 'Ventspils', 'Rēzekne', 'Jūrmala', 'Ogre', 'Dobele', 'Cēsis', 'Kuldīga'],
    Lithuania: ['Vilnius', 'Kaunas', 'Klaipeda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Utena', 'Tauragė', 'Telšiai'],
    Honduras: ['Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Cortes', 'El Paraíso', 'Francisco Morazán', 'Islas de la Bahía', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Yoro'],
    
};

function CountryState({ countryValue, stateValue, handleCountryChange, handleStateChange }) {
    const [states, setStates] = useState([]);

    const onCountryChange = (event) => {
        const selectedCountry = event.target.value;
        handleCountryChange(event); // Update the parent component's state
        setStates(countriesStates[selectedCountry] || []);
    };

    return (
        <div className="pr-4">
            <div className="mb-4">
                <label className="block text-[#502314]">
                    Country<span className="text-red-500">*</span>
                </label>
                <select
                    name="country"
                    className="border border-gray-300 rounded p-2 mt-1 w-[400px] outline-red-200"
                    value={countryValue}
                    onChange={onCountryChange}
                >
                    <option value="">Select Country</option>
                    {Object.keys(countriesStates).map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-[#502314]">
                    State<span className="text-red-500">*</span>
                </label>
                <select
                    name="state"
                    className="border border-gray-300 rounded p-2 mt-1 w-[400px] outline-red-200"
                    value={stateValue}
                    onChange={handleStateChange}
                    disabled={!countryValue}
                >
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default CountryState;


