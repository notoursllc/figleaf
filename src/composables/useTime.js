export default function useTime() {

    function getTimezones() {
        return {
            "Africa/Abidjan": {
                c: ["CI", "BF", "GH", "GM", "GN", "ML", "MR", "SH", "SL", "SN", "TG"]
            },
            "Africa/Accra": {
                a: "Africa/Abidjan",
                c: ["GH"],
            },
            "Africa/Addis_Ababa": {
                a: "Africa/Nairobi",
                c: ["ET"],
            },
            "Africa/Algiers": {
                c: ["DZ"]
            },
            "Africa/Asmara": {
                a: "Africa/Nairobi",
                c: ["ER"],
            },
            "Africa/Asmera": {
                a: "Africa/Nairobi",
                c: ["ER"],
            },
            "Africa/Bamako": {
                a: "Africa/Abidjan",
                c: ["ML"],
            },
            "Africa/Bangui": {
                a: "Africa/Lagos",
                c: ["CF"],
            },
            "Africa/Banjul": {
                a: "Africa/Abidjan",
                c: ["GM"],
            },
            "Africa/Bissau": {
                c: ["GW"]
            },
            "Africa/Blantyre": {
                a: "Africa/Maputo",
                c: ["MW"],
            },
            "Africa/Brazzaville": {
                a: "Africa/Lagos",
                c: ["CG"],
            },
            "Africa/Bujumbura": {
                a: "Africa/Maputo",
                c: ["BI"],
            },
            "Africa/Cairo": {
                c: ["EG"]
            },
            "Africa/Casablanca": {
                c: ["MA"]
            },
            "Africa/Ceuta": {
                c: ["ES"]
            },
            "Africa/Conakry": {
                a: "Africa/Abidjan",
                c: ["GN"],
            },
            "Africa/Dakar": {
                a: "Africa/Abidjan",
                c: ["SN"],
            },
            "Africa/Dar_es_Salaam": {
                a: "Africa/Nairobi",
                c: ["TZ"],
            },
            "Africa/Djibouti": {
                a: "Africa/Nairobi",
                c: ["DJ"],
            },
            "Africa/Douala": {
                a: "Africa/Lagos",
                c: ["CM"],
            },
            "Africa/El_Aaiun": {
                c: ["EH"]
            },
            "Africa/Freetown": {
                a: "Africa/Abidjan",
                c: ["SL"],
            },
            "Africa/Gaborone": {
                a: "Africa/Maputo",
                c: ["BW"],
            },
            "Africa/Harare": {
                a: "Africa/Maputo",
                c: ["ZW"],
            },
            "Africa/Johannesburg": {
                c: ["ZA", "LS", "SZ"]
            },
            "Africa/Juba": {
                c: ["SS"]
            },
            "Africa/Kampala": {
                a: "Africa/Nairobi",
                c: ["UG"],
            },
            "Africa/Khartoum": {
                c: ["SD"]
            },
            "Africa/Kigali": {
                a: "Africa/Maputo",
                c: ["RW"],
            },
            "Africa/Kinshasa": {
                a: "Africa/Lagos",
                c: ["CD"],
            },
            "Africa/Lagos": {
                c: ["NG", "AO", "BJ", "CD", "CF", "CG", "CM", "GA", "GQ", "NE"]
            },
            "Africa/Libreville": {
                a: "Africa/Lagos",
                c: ["GA"],
            },
            "Africa/Lome": {
                a: "Africa/Abidjan",
                c: ["TG"],
            },
            "Africa/Luanda": {
                a: "Africa/Lagos",
                c: ["AO"],
            },
            "Africa/Lubumbashi": {
                a: "Africa/Maputo",
                c: ["CD"],
            },
            "Africa/Lusaka": {
                a: "Africa/Maputo",
                c: ["ZM"],
            },
            "Africa/Malabo": {
                a: "Africa/Lagos",
                c: ["GQ"],
            },
            "Africa/Maputo": {
                c: ["MZ", "BI", "BW", "CD", "MW", "RW", "ZM", "ZW"]
            },
            "Africa/Maseru": {
                a: "Africa/Johannesburg",
                c: ["LS"],
            },
            "Africa/Mbabane": {
                a: "Africa/Johannesburg",
                c: ["SZ"],
            },
            "Africa/Mogadishu": {
                a: "Africa/Nairobi",
                c: ["SO"],
            },
            "Africa/Monrovia": {
                c: ["LR"]
            },
            "Africa/Nairobi": {
                c: ["KE", "DJ", "ER", "ET", "KM", "MG", "SO", "TZ", "UG", "YT"]
            },
            "Africa/Ndjamena": {
                c: ["TD"]
            },
            "Africa/Niamey": {
                a: "Africa/Lagos",
                c: ["NE"],
            },
            "Africa/Nouakchott": {
                a: "Africa/Abidjan",
                c: ["MR"],
            },
            "Africa/Ouagadougou": {
                a: "Africa/Abidjan",
                c: ["BF"],
            },
            "Africa/Porto-Novo": {
                a: "Africa/Lagos",
                c: ["BJ"],
            },
            "Africa/Sao_Tome": {
                c: ["ST"]
            },
            "Africa/Timbuktu": {
                a: "Africa/Abidjan",
                c: ["ML"],
            },
            "Africa/Tripoli": {
                c: ["LY"]
            },
            "Africa/Tunis": {
                c: ["TN"]
            },
            "Africa/Windhoek": {
                c: ["NA"]
            },
            "America/Adak": {
                c: ["US"]
            },
            "America/Anchorage": {
                c: ["US"]
            },
            "America/Anguilla": {
                a: "America/Puerto_Rico",
                c: ["AI"],
            },
            "America/Antigua": {
                a: "America/Puerto_Rico",
                c: ["AG"],
            },
            "America/Araguaina": {
                c: ["BR"]
            },
            "America/Argentina/Buenos_Aires": {
                c: ["AR"]
            },
            "America/Argentina/Catamarca": {
                c: ["AR"]
            },
            "America/Argentina/ComodRivadavia": {
                a: "America/Argentina/Catamarca",
            },
            "America/Argentina/Cordoba": {
                c: ["AR"]
            },
            "America/Argentina/Jujuy": {
                c: ["AR"]
            },
            "America/Argentina/La_Rioja": {
                c: ["AR"]
            },
            "America/Argentina/Mendoza": {
                c: ["AR"]
            },
            "America/Argentina/Rio_Gallegos": {
                c: ["AR"]
            },
            "America/Argentina/Salta": {
                c: ["AR"]
            },
            "America/Argentina/San_Juan": {
                c: ["AR"]
            },
            "America/Argentina/San_Luis": {
                c: ["AR"]
            },
            "America/Argentina/Tucuman": {
                c: ["AR"]
            },
            "America/Argentina/Ushuaia": {
                c: ["AR"]
            },
            "America/Aruba": {
                a: "America/Puerto_Rico",
                c: ["AW"],
            },
            "America/Asuncion": {
                c: ["PY"]
            },
            "America/Atikokan": {
                a: "America/Panama",
                c: ["CA"],
            },
            "America/Atka": {
                a: "America/Adak",
            },
            "America/Bahia": {
                c: ["BR"]
            },
            "America/Bahia_Banderas": {
                c: ["MX"]
            },
            "America/Barbados": {
                c: ["BB"]
            },
            "America/Belem": {
                c: ["BR"]
            },
            "America/Belize": {
                c: ["BZ"]
            },
            "America/Blanc-Sablon": {
                a: "America/Puerto_Rico",
                c: ["CA"],
            },
            "America/Boa_Vista": {
                c: ["BR"]
            },
            "America/Bogota": {
                c: ["CO"]
            },
            "America/Boise": {
                c: ["US"]
            },
            "America/Buenos_Aires": {
                a: "America/Argentina/Buenos_Aires",
            },
            "America/Cambridge_Bay": {
                c: ["CA"]
            },
            "America/Campo_Grande": {
                c: ["BR"]
            },
            "America/Cancun": {
                c: ["MX"]
            },
            "America/Caracas": {
                c: ["VE"]
            },
            "America/Catamarca": {
                a: "America/Argentina/Catamarca",
            },
            "America/Cayenne": {
                c: ["GF"]
            },
            "America/Cayman": {
                a: "America/Panama",
                c: ["KY"],
            },
            "America/Chicago": {
                c: ["US"]
            },
            "America/Chihuahua": {
                c: ["MX"]
            },
            "America/Coral_Harbour": {
                a: "America/Panama",
                c: ["CA"],
            },
            "America/Cordoba": {
                a: "America/Argentina/Cordoba",
            },
            "America/Costa_Rica": {
                c: ["CR"]
            },
            "America/Creston": {
                a: "America/Phoenix",
                c: ["CA"],
            },
            "America/Cuiaba": {
                c: ["BR"]
            },
            "America/Curacao": {
                a: "America/Puerto_Rico",
                c: ["CW"],
            },
            "America/Danmarkshavn": {
                c: ["GL"]
            },
            "America/Dawson": {
                c: ["CA"]
            },
            "America/Dawson_Creek": {
                c: ["CA"]
            },
            "America/Denver": {
                c: ["US"]
            },
            "America/Detroit": {
                c: ["US"]
            },
            "America/Dominica": {
                a: "America/Puerto_Rico",
                c: ["DM"],
            },
            "America/Edmonton": {
                c: ["CA"]
            },
            "America/Eirunepe": {
                c: ["BR"]
            },
            "America/El_Salvador": {
                c: ["SV"]
            },
            "America/Ensenada": {
                a: "America/Tijuana",
            },
            "America/Fort_Nelson": {
                c: ["CA"]
            },
            "America/Fort_Wayne": {
                a: "America/Indiana/Indianapolis",
                c: ["CA"]
            },
            "America/Fortaleza": {
                c: ["BR"]
            },
            "America/Glace_Bay": {
                c: ["CA"]
            },
            "America/Godthab": {
                a: "America/Nuuk",
            },
            "America/Goose_Bay": {
                c: ["CA"]
            },
            "America/Grand_Turk": {
                c: ["TC"]
            },
            "America/Grenada": {
                a: "America/Puerto_Rico",
                c: ["GD"],
            },
            "America/Guadeloupe": {
                a: "America/Puerto_Rico",
                c: ["GP"],
            },
            "America/Guatemala": {
                c: ["GT"]
            },
            "America/Guayaquil": {
                c: ["EC"]
            },
            "America/Guyana": {
                c: ["GY"]
            },
            "America/Halifax": {
                c: ["CA"]
            },
            "America/Havana": {
                c: ["CU"]
            },
            "America/Hermosillo": {
                c: ["MX"]
            },
            "America/Indiana/Indianapolis": {
                c: ["US"]
            },
            "America/Indiana/Knox": {
                c: ["US"]
            },
            "America/Indiana/Marengo": {
                c: ["US"]
            },
            "America/Indiana/Petersburg": {
                c: ["US"]
            },
            "America/Indiana/Tell_City": {
                c: ["US"]
            },
            "America/Indiana/Vevay": {
                c: ["US"]
            },
            "America/Indiana/Vincennes": {
                c: ["US"]
            },
            "America/Indiana/Winamac": {
                c: ["US"]
            },
            "America/Indianapolis": {
                a: "America/Indiana/Indianapolis",
                c: ["US"]
            },
            "America/Inuvik": {
                c: ["CA"]
            },
            "America/Iqaluit": {
                c: ["CA"]
            },
            "America/Jamaica": {
                c: ["JM"]
            },
            "America/Jujuy": {
                a: "America/Argentina/Jujuy",
            },
            "America/Juneau": {
                c: ["US"]
            },
            "America/Kentucky/Louisville": {
                c: ["US"]
            },
            "America/Kentucky/Monticello": {
                c: ["US"]
            },
            "America/Knox_IN": {
                a: "America/Indiana/Knox",
            },
            "America/Kralendijk": {
                a: "America/Puerto_Rico",
                c: ["BQ"],
            },
            "America/La_Paz": {
                c: ["BO"]
            },
            "America/Lima": {
                c: ["PE"]
            },
            "America/Los_Angeles": {
                c: ["US"]
            },
            "America/Louisville": {
                a: "America/Kentucky/Louisville",
            },
            "America/Lower_Princes": {
                a: "America/Puerto_Rico",
                c: ["SX"],
            },
            "America/Maceio": {
                c: ["BR"]
            },
            "America/Managua": {
                c: ["NI"]
            },
            "America/Manaus": {
                c: ["BR"]
            },
            "America/Marigot": {
                a: "America/Puerto_Rico",
                c: ["MF"],
            },
            "America/Martinique": {
                c: ["MQ"]
            },
            "America/Matamoros": {
                c: ["MX"]
            },
            "America/Mazatlan": {
                c: ["MX"]
            },
            "America/Mendoza": {
                a: "America/Argentina/Mendoza",
            },
            "America/Menominee": {
                c: ["US"]
            },
            "America/Merida": {
                c: ["MX"]
            },
            "America/Metlakatla": {
                c: ["US"]
            },
            "America/Mexico_City": {
                c: ["MX"]
            },
            "America/Miquelon": {
                c: ["PM"]
            },
            "America/Moncton": {
                c: ["CA"]
            },
            "America/Monterrey": {
                c: ["MX"]
            },
            "America/Montevideo": {
                c: ["UY"]
            },
            "America/Montreal": {
                a: "America/Toronto",
                c: ["CA"],
            },
            "America/Montserrat": {
                a: "America/Puerto_Rico",
                c: ["MS"],
            },
            "America/Nassau": {
                a: "America/Toronto",
                c: ["BS"],
            },
            "America/New_York": {
                c: ["US"]
            },
            "America/Nipigon": {
                c: ["CA"]
            },
            "America/Nome": {
                c: ["US"]
            },
            "America/Noronha": {
                c: ["BR"]
            },
            "America/North_Dakota/Beulah": {
                c: ["US"]
            },
            "America/North_Dakota/Center": {
                c: ["US"]
            },
            "America/North_Dakota/New_Salem": {
                c: ["US"]
            },
            "America/Nuuk": {
                c: ["GL"]
            },
            "America/Ojinaga": {
                c: ["MX"]
            },
            "America/Panama": {
                c: ["PA", "CA", "KY"]
            },
            "America/Pangnirtung": {
                c: ["CA"]
            },
            "America/Paramaribo": {
                c: ["SR"]
            },
            "America/Phoenix": {
                c: ["US", "CA"]
            },
            "America/Port-au-Prince": {
                c: ["HT"]
            },
            "America/Port_of_Spain": {
                a: "America/Puerto_Rico",
                c: ["TT"],
            },
            "America/Porto_Acre": {
                a: "America/Rio_Branco",
            },
            "America/Porto_Velho": {
                c: ["BR"]
            },
            "America/Puerto_Rico": {
                c: [
                    "PR",
                    "AG",
                    "CA",
                    "AI",
                    "AW",
                    "BL",
                    "BQ",
                    "CW",
                    "DM",
                    "GD",
                    "GP",
                    "KN",
                    "LC",
                    "MF",
                    "MS",
                    "SX",
                    "TT",
                    "VC",
                    "VG",
                    "VI"
                ]
            },
            "America/Punta_Arenas": {
                c: ["CL"]
            },
            "America/Rainy_River": {
                c: ["CA"]
            },
            "America/Rankin_Inlet": {
                c: ["CA"]
            },
            "America/Recife": {
                c: ["BR"]
            },
            "America/Regina": {
                c: ["CA"]
            },
            "America/Resolute": {
                c: ["CA"]
            },
            "America/Rio_Branco": {
                c: ["BR"]
            },
            "America/Rosario": {
                a: "America/Argentina/Cordoba",
            },
            "America/Santa_Isabel": {
                a: "America/Tijuana",
            },
            "America/Santarem": {
                c: ["BR"]
            },
            "America/Santiago": {
                c: ["CL"]
            },
            "America/Santo_Domingo": {
                c: ["DO"]
            },
            "America/Sao_Paulo": {
                c: ["BR"]
            },
            "America/Scoresbysund": {
                c: ["GL"]
            },
            "America/Shiprock": {
                a: "America/Denver",
            },
            "America/Sitka": {
                c: ["US"]
            },
            "America/St_Barthelemy": {
                a: "America/Puerto_Rico",
                c: ["BL"],
            },
            "America/St_Johns": {
                c: ["CA"]
            },
            "America/St_Kitts": {
                a: "America/Puerto_Rico",
                c: ["KN"],
            },
            "America/St_Lucia": {
                a: "America/Puerto_Rico",
                c: ["LC"],
            },
            "America/St_Thomas": {
                a: "America/Puerto_Rico",
                c: ["VI"],
            },
            "America/St_Vincent": {
                a: "America/Puerto_Rico",
                c: ["VC"],
            },
            "America/Swift_Current": {
                c: ["CA"]
            },
            "America/Tegucigalpa": {
                c: ["HN"]
            },
            "America/Thule": {
                c: ["GL"]
            },
            "America/Thunder_Bay": {
                c: ["CA"]
            },
            "America/Tijuana": {
                c: ["MX"]
            },
            "America/Toronto": {
                c: ["CA", "BS"]
            },
            "America/Tortola": {
                a: "America/Puerto_Rico",
                c: ["VG"],
            },
            "America/Vancouver": {
                c: ["CA"]
            },
            "America/Virgin": {
                a: "America/Puerto_Rico",
                c: ["VI"],
            },
            "America/Whitehorse": {
                c: ["CA"]
            },
            "America/Winnipeg": {
                c: ["CA"]
            },
            "America/Yakutat": {
                c: ["US"]
            },
            "America/Yellowknife": {
                c: ["CA"]
            },
            "Antarctica/Casey": {
                c: ["AQ"]
            },
            "Antarctica/Davis": {
                c: ["AQ"]
            },
            "Antarctica/DumontDUrville": {
                a: "Pacific/Port_Moresby",
                c: ["AQ"],
            },
            "Antarctica/Macquarie": {
                c: ["AU"]
            },
            "Antarctica/Mawson": {
                c: ["AQ"]
            },
            "Antarctica/McMurdo": {
                a: "Pacific/Auckland",
                c: ["AQ"],
            },
            "Antarctica/Palmer": {
                c: ["AQ"]
            },
            "Antarctica/Rothera": {
                c: ["AQ"]
            },
            "Antarctica/South_Pole": {
                a: "Pacific/Auckland",
                c: ["AQ"],
            },
            "Antarctica/Syowa": {
                a: "Asia/Riyadh",
                c: ["AQ"],
            },
            "Antarctica/Troll": {
                c: ["AQ"]
            },
            "Antarctica/Vostok": {
                c: ["AQ"]
            },
            "Arctic/Longyearbyen": {
                a: "Europe/Oslo",
                c: ["SJ"],
            },
            "Asia/Aden": {
                a: "Asia/Riyadh",
                c: ["YE"],
            },
            "Asia/Almaty": {
                c: ["KZ"]
            },
            "Asia/Amman": {
                c: ["JO"]
            },
            "Asia/Anadyr": {
                c: ["RU"]
            },
            "Asia/Aqtau": {
                c: ["KZ"]
            },
            "Asia/Aqtobe": {
                c: ["KZ"]
            },
            "Asia/Ashgabat": {
                c: ["TM"]
            },
            "Asia/Ashkhabad": {
                a: "Asia/Ashgabat",
            },
            "Asia/Atyrau": {
                c: ["KZ"]
            },
            "Asia/Baghdad": {
                c: ["IQ"]
            },
            "Asia/Bahrain": {
                a: "Asia/Qatar",
                c: ["BH"],
            },
            "Asia/Baku": {
                c: ["AZ"]
            },
            "Asia/Bangkok": {
                c: ["TH", "KH", "LA", "VN"]
            },
            "Asia/Barnaul": {
                c: ["RU"]
            },
            "Asia/Beirut": {
                c: ["LB"]
            },
            "Asia/Bishkek": {
                c: ["KG"]
            },
            "Asia/Brunei": {
                c: ["BN"]
            },
            "Asia/Calcutta": {
                a: "Asia/Kolkata",
            },
            "Asia/Chita": {
                c: ["RU"]
            },
            "Asia/Choibalsan": {
                c: ["MN"]
            },
            "Asia/Chongqing": {
                a: "Asia/Shanghai",
            },
            "Asia/Chungking": {
                a: "Asia/Shanghai",
            },
            "Asia/Colombo": {
                c: ["LK"]
            },
            "Asia/Dacca": {
                a: "Asia/Dhaka",
            },
            "Asia/Damascus": {
                c: ["SY"]
            },
            "Asia/Dhaka": {
                c: ["BD"]
            },
            "Asia/Dili": {
                c: ["TL"]
            },
            "Asia/Dubai": {
                c: ["AE", "OM"]
            },
            "Asia/Dushanbe": {
                c: ["TJ"]
            },
            "Asia/Famagusta": {
                c: ["CY"]
            },
            "Asia/Gaza": {
                c: ["PS"]
            },
            "Asia/Harbin": {
                a: "Asia/Shanghai",
            },
            "Asia/Hebron": {
                c: ["PS"]
            },
            "Asia/Ho_Chi_Minh": {
                c: ["VN"]
            },
            "Asia/Hong_Kong": {
                c: ["HK"]
            },
            "Asia/Hovd": {
                c: ["MN"]
            },
            "Asia/Irkutsk": {
                c: ["RU"]
            },
            "Asia/Istanbul": {
                a: "Europe/Istanbul",
            },
            "Asia/Jakarta": {
                c: ["ID"]
            },
            "Asia/Jayapura": {
                c: ["ID"]
            },
            "Asia/Jerusalem": {
                c: ["IL"]
            },
            "Asia/Kabul": {
                c: ["AF"]
            },
            "Asia/Kamchatka": {
                c: ["RU"]
            },
            "Asia/Karachi": {
                c: ["PK"]
            },
            "Asia/Kashgar": {
                a: "Asia/Urumqi",
            },
            "Asia/Kathmandu": {
                c: ["NP"]
            },
            "Asia/Katmandu": {
                a: "Asia/Kathmandu",
            },
            "Asia/Khandyga": {
                c: ["RU"]
            },
            "Asia/Kolkata": {
                c: ["IN"]
            },
            "Asia/Krasnoyarsk": {
                c: ["RU"]
            },
            "Asia/Kuala_Lumpur": {
                c: ["MY"]
            },
            "Asia/Kuching": {
                c: ["MY"]
            },
            "Asia/Kuwait": {
                a: "Asia/Riyadh",
                c: ["KW"],
            },
            "Asia/Macao": {
                a: "Asia/Macau",
            },
            "Asia/Macau": {
                c: ["MO"]
            },
            "Asia/Magadan": {
                c: ["RU"]
            },
            "Asia/Makassar": {
                c: ["ID"]
            },
            "Asia/Manila": {
                c: ["PH"]
            },
            "Asia/Muscat": {
                a: "Asia/Dubai",
                c: ["OM"],
            },
            "Asia/Nicosia": {
                c: ["CY"]
            },
            "Asia/Novokuznetsk": {
                c: ["RU"]
            },
            "Asia/Novosibirsk": {
                c: ["RU"]
            },
            "Asia/Omsk": {
                c: ["RU"]
            },
            "Asia/Oral": {
                c: ["KZ"]
            },
            "Asia/Phnom_Penh": {
                a: "Asia/Bangkok",
                c: ["KH"],
            },
            "Asia/Pontianak": {
                c: ["ID"]
            },
            "Asia/Pyongyang": {
                c: ["KP"]
            },
            "Asia/Qatar": {
                c: ["QA", "BH"]
            },
            "Asia/Qostanay": {
                c: ["KZ"]
            },
            "Asia/Qyzylorda": {
                c: ["KZ"]
            },
            "Asia/Rangoon": {
                a: "Asia/Yangon",
            },
            "Asia/Riyadh": {
                c: ["SA", "AQ", "KW", "YE"]
            },
            "Asia/Saigon": {
                a: "Asia/Ho_Chi_Minh",
            },
            "Asia/Sakhalin": {
                c: ["RU"]
            },
            "Asia/Samarkand": {
                c: ["UZ"]
            },
            "Asia/Seoul": {
                c: ["KR"]
            },
            "Asia/Shanghai": {
                c: ["CN"]
            },
            "Asia/Singapore": {
                c: ["SG", "MY"]
            },
            "Asia/Srednekolymsk": {
                c: ["RU"]
            },
            "Asia/Taipei": {
                c: ["TW"]
            },
            "Asia/Tashkent": {
                c: ["UZ"]
            },
            "Asia/Tbilisi": {
                c: ["GE"]
            },
            "Asia/Tehran": {
                c: ["IR"]
            },
            "Asia/Tel_Aviv": {
                a: "Asia/Jerusalem",
            },
            "Asia/Thimbu": {
                a: "Asia/Thimphu",
            },
            "Asia/Thimphu": {
                c: ["BT"]
            },
            "Asia/Tokyo": {
                c: ["JP"]
            },
            "Asia/Tomsk": {
                c: ["RU"]
            },
            "Asia/Ujung_Pandang": {
                a: "Asia/Makassar",
            },
            "Asia/Ulaanbaatar": {
                c: ["MN"]
            },
            "Asia/Ulan_Bator": {
                a: "Asia/Ulaanbaatar",
            },
            "Asia/Urumqi": {
                c: ["CN"]
            },
            "Asia/Ust-Nera": {
                c: ["RU"]
            },
            "Asia/Vientiane": {
                a: "Asia/Bangkok",
                c: ["LA"],
            },
            "Asia/Vladivostok": {
                c: ["RU"]
            },
            "Asia/Yakutsk": {
                c: ["RU"]
            },
            "Asia/Yangon": {
                c: ["MM"]
            },
            "Asia/Yekaterinburg": {
                c: ["RU"]
            },
            "Asia/Yerevan": {
                c: ["AM"]
            },
            "Atlantic/Azores": {
                c: ["PT"]
            },
            "Atlantic/Bermuda": {
                c: ["BM"]
            },
            "Atlantic/Canary": {
                c: ["ES"]
            },
            "Atlantic/Cape_Verde": {
                c: ["CV"]
            },
            "Atlantic/Faeroe": {
                a: "Atlantic/Faroe",
            },
            "Atlantic/Faroe": {
                c: ["FO"]
            },
            "Atlantic/Jan_Mayen": {
                a: "Europe/Oslo",
                c: ["SJ"],
            },
            "Atlantic/Madeira": {
                c: ["PT"]
            },
            "Atlantic/Reykjavik": {
                c: ["IS"]
            },
            "Atlantic/South_Georgia": {
                c: ["GS"]
            },
            "Atlantic/St_Helena": {
                a: "Africa/Abidjan",
                c: ["SH"],
            },
            "Atlantic/Stanley": {
                c: ["FK"]
            },
            "Australia/ACT": {
                a: "Australia/Sydney",
            },
            "Australia/Adelaide": {
                c: ["AU"]
            },
            "Australia/Brisbane": {
                c: ["AU"]
            },
            "Australia/Broken_Hill": {
                c: ["AU"]
            },
            "Australia/Canberra": {
                a: "Australia/Sydney",
            },
            "Australia/Currie": {
                a: "Australia/Hobart",
            },
            "Australia/Darwin": {
                c: ["AU"]
            },
            "Australia/Eucla": {
                c: ["AU"]
            },
            "Australia/Hobart": {
                c: ["AU"]
            },
            "Australia/LHI": {
                a: "Australia/Lord_Howe",
            },
            "Australia/Lindeman": {
                c: ["AU"]
            },
            "Australia/Lord_Howe": {
                c: ["AU"]
            },
            "Australia/Melbourne": {
                c: ["AU"]
            },
            "Australia/NSW": {
                a: "Australia/Sydney",
            },
            "Australia/North": {
                a: "Australia/Darwin",
            },
            "Australia/Perth": {
                c: ["AU"]
            },
            "Australia/Queensland": {
                a: "Australia/Brisbane",
            },
            "Australia/South": {
                a: "Australia/Adelaide",
            },
            "Australia/Sydney": {
                c: ["AU"]
            },
            "Australia/Tasmania": {
                a: "Australia/Hobart",
            },
            "Australia/Victoria": {
                a: "Australia/Melbourne",
            },
            "Australia/West": {
                a: "Australia/Perth",
            },
            "Australia/Yancowinna": {
                a: "Australia/Broken_Hill",
            },
            "Brazil/Acre": {
                a: "America/Rio_Branco",
            },
            "Brazil/DeNoronha": {
                a: "America/Noronha",
            },
            "Brazil/East": {
                a: "America/Sao_Paulo",
            },
            "Brazil/West": {
                a: "America/Manaus",
            },
            CET: {
            },
            CST6CDT: {
            },
            "Canada/Atlantic": {
                a: "America/Halifax",
            },
            "Canada/Central": {
                a: "America/Winnipeg",
            },
            "Canada/Eastern": {
                a: "America/Toronto",
                c: ["CA"],
            },
            "Canada/Mountain": {
                a: "America/Edmonton",
            },
            "Canada/Newfoundland": {
                a: "America/St_Johns",
            },
            "Canada/Pacific": {
                a: "America/Vancouver",
            },
            "Canada/Saskatchewan": {
                a: "America/Regina",
            },
            "Canada/Yukon": {
                a: "America/Whitehorse",
            },
            "Chile/Continental": {
                a: "America/Santiago",
            },
            "Chile/EasterIsland": {
                a: "Pacific/Easter",
            },
            Cuba: {
                a: "America/Havana",
            },
            EET: {
            },
            EST: {
            },
            EST5EDT: {
            },
            Egypt: {
                a: "Africa/Cairo",
            },
            Eire: {
                a: "Europe/Dublin",
            },
            "Europe/Amsterdam": {
                c: ["NL"]
            },
            "Europe/Andorra": {
                c: ["AD"]
            },
            "Europe/Astrakhan": {
                c: ["RU"]
            },
            "Europe/Athens": {
                c: ["GR"]
            },
            "Europe/Belfast": {
                a: "Europe/London",
                c: ["GB"],
            },
            "Europe/Belgrade": {
                c: ["RS", "BA", "HR", "ME", "MK", "SI"]
            },
            "Europe/Berlin": {
                c: ["DE"]
            },
            "Europe/Bratislava": {
                a: "Europe/Prague",
                c: ["SK"],
            },
            "Europe/Brussels": {
                c: ["BE"]
            },
            "Europe/Bucharest": {
                c: ["RO"]
            },
            "Europe/Budapest": {
                c: ["HU"]
            },
            "Europe/Busingen": {
                a: "Europe/Zurich",
                c: ["DE"],
            },
            "Europe/Chisinau": {
                c: ["MD"]
            },
            "Europe/Copenhagen": {
                c: ["DK"]
            },
            "Europe/Dublin": {
                c: ["IE"]
            },
            "Europe/Gibraltar": {
                c: ["GI"]
            },
            "Europe/Guernsey": {
                a: "Europe/London",
                c: ["GG"],
            },
            "Europe/Helsinki": {
                c: ["FI", "AX"]
            },
            "Europe/Isle_of_Man": {
                a: "Europe/London",
                c: ["IM"],
            },
            "Europe/Istanbul": {
                c: ["TR"]
            },
            "Europe/Jersey": {
                a: "Europe/London",
                c: ["JE"],
            },
            "Europe/Kaliningrad": {
                c: ["RU"]
            },
            "Europe/Kiev": {
                c: ["UA"]
            },
            "Europe/Kirov": {
                c: ["RU"]
            },
            "Europe/Lisbon": {
                c: ["PT"]
            },
            "Europe/Ljubljana": {
                a: "Europe/Belgrade",
                c: ["SI"],
            },
            "Europe/London": {
                c: ["GB", "GG", "IM", "JE"]
            },
            "Europe/Luxembourg": {
                c: ["LU"]
            },
            "Europe/Madrid": {
                c: ["ES"]
            },
            "Europe/Malta": {
                c: ["MT"]
            },
            "Europe/Mariehamn": {
                a: "Europe/Helsinki",
                c: ["AX"],
            },
            "Europe/Minsk": {
                c: ["BY"]
            },
            "Europe/Monaco": {
                c: ["MC"]
            },
            "Europe/Moscow": {
                c: ["RU"]
            },
            "Europe/Nicosia": {
                a: "Asia/Nicosia",
            },
            "Europe/Oslo": {
                c: ["NO", "SJ", "BV"]
            },
            "Europe/Paris": {
                c: ["FR"]
            },
            "Europe/Podgorica": {
                a: "Europe/Belgrade",
                c: ["ME"],
            },
            "Europe/Prague": {
                c: ["CZ", "SK"]
            },
            "Europe/Riga": {
                c: ["LV"]
            },
            "Europe/Rome": {
                c: ["IT", "SM", "VA"]
            },
            "Europe/Samara": {
                c: ["RU"]
            },
            "Europe/San_Marino": {
                a: "Europe/Rome",
                c: ["SM"],
            },
            "Europe/Sarajevo": {
                a: "Europe/Belgrade",
                c: ["BA"],
            },
            "Europe/Saratov": {
                c: ["RU"]
            },
            "Europe/Simferopol": {
                c: ["RU", "UA"]
            },
            "Europe/Skopje": {
                a: "Europe/Belgrade",
                c: ["MK"],
            },
            "Europe/Sofia": {
                c: ["BG"]
            },
            "Europe/Stockholm": {
                c: ["SE"]
            },
            "Europe/Tallinn": {
                c: ["EE"]
            },
            "Europe/Tirane": {
                c: ["AL"]
            },
            "Europe/Tiraspol": {
                a: "Europe/Chisinau",
            },
            "Europe/Ulyanovsk": {
                c: ["RU"]
            },
            "Europe/Uzhgorod": {
                c: ["UA"]
            },
            "Europe/Vaduz": {
                a: "Europe/Zurich",
                c: ["LI"],
            },
            "Europe/Vatican": {
                a: "Europe/Rome",
                c: ["VA"],
            },
            "Europe/Vienna": {
                c: ["AT"]
            },
            "Europe/Vilnius": {
                c: ["LT"]
            },
            "Europe/Volgograd": {
                c: ["RU"]
            },
            "Europe/Warsaw": {
                c: ["PL"]
            },
            "Europe/Zagreb": {
                a: "Europe/Belgrade",
                c: ["HR"],
            },
            "Europe/Zaporozhye": {
                c: ["UA"]
            },
            "Europe/Zurich": {
                c: ["CH", "DE", "LI"]
            },
            GB: {
                a: "Europe/London",
                c: ["GB"],
            },
            "GB-Eire": {
                a: "Europe/London",
                c: ["GB"],
            },
            Hongkong: {
                a: "Asia/Hong_Kong",
            },
            Iceland: {
                a: "Atlantic/Reykjavik",
            },
            "Indian/Antananarivo": {
                a: "Africa/Nairobi",
                c: ["MG"],
            },
            "Indian/Chagos": {
                c: ["IO"]
            },
            "Indian/Christmas": {
                c: ["CX"]
            },
            "Indian/Cocos": {
                c: ["CC"]
            },
            "Indian/Comoro": {
                a: "Africa/Nairobi",
                c: ["KM"],
            },
            "Indian/Kerguelen": {
                c: ["TF", "HM"]
            },
            "Indian/Mahe": {
                c: ["SC"]
            },
            "Indian/Maldives": {
                c: ["MV"]
            },
            "Indian/Mauritius": {
                c: ["MU"]
            },
            "Indian/Mayotte": {
                a: "Africa/Nairobi",
                c: ["YT"],
            },
            "Indian/Reunion": {
                c: ["RE", "TF"]
            },
            Iran: {
                a: "Asia/Tehran",
            },
            Israel: {
                a: "Asia/Jerusalem",
            },
            Jamaica: {
                a: "America/Jamaica",
            },
            Japan: {
                a: "Asia/Tokyo",
            },
            Kwajalein: {
                a: "Pacific/Kwajalein",
            },
            Libya: {
                a: "Africa/Tripoli",
            },
            "Mexico/BajaNorte": {
                a: "America/Tijuana",
            },
            "Mexico/BajaSur": {
                a: "America/Mazatlan",
            },
            "Mexico/General": {
                a: "America/Mexico_City",
            },
            NZ: {
                a: "Pacific/Auckland",
                c: ["NZ"],
            },
            "NZ-CHAT": {
                a: "Pacific/Chatham",
            },
            Navajo: {
                a: "America/Denver",
            },
            PRC: {
                a: "Asia/Shanghai",
            },
            "Pacific/Apia": {
                c: ["WS"]
            },
            "Pacific/Auckland": {
                c: ["NZ", "AQ"]
            },
            "Pacific/Bougainville": {
                c: ["PG"]
            },
            "Pacific/Chatham": {
                c: ["NZ"]
            },
            "Pacific/Chuuk": {
                c: ["FM"]
            },
            "Pacific/Easter": {
                c: ["CL"]
            },
            "Pacific/Efate": {
                c: ["VU"]
            },
            "Pacific/Enderbury": {
                a: "Pacific/Kanton",
            },
            "Pacific/Fakaofo": {
                c: ["TK"]
            },
            "Pacific/Fiji": {
                c: ["FJ"]
            },
            "Pacific/Funafuti": {
                c: ["TV"]
            },
            "Pacific/Galapagos": {
                c: ["EC"]
            },
            "Pacific/Gambier": {
                c: ["PF"]
            },
            "Pacific/Guadalcanal": {
                c: ["SB"]
            },
            "Pacific/Guam": {
                c: ["GU", "MP"]
            },
            "Pacific/Honolulu": {
                c: ["US", "UM"]
            },
            "Pacific/Johnston": {
                a: "Pacific/Honolulu",
                c: ["UM"],
            },
            "Pacific/Kanton": {
                c: ["KI"]
            },
            "Pacific/Kiritimati": {
                c: ["KI"]
            },
            "Pacific/Kosrae": {
                c: ["FM"]
            },
            "Pacific/Kwajalein": {
                c: ["MH"]
            },
            "Pacific/Majuro": {
                c: ["MH"]
            },
            "Pacific/Marquesas": {
                c: ["PF"]
            },
            "Pacific/Midway": {
                a: "Pacific/Pago_Pago",
                c: ["UM"],
            },
            "Pacific/Nauru": {
                c: ["NR"]
            },
            "Pacific/Niue": {
                c: ["NU"]
            },
            "Pacific/Norfolk": {
                c: ["NF"]
            },
            "Pacific/Noumea": {
                c: ["NC"]
            },
            "Pacific/Pago_Pago": {
                c: ["AS", "UM"]
            },
            "Pacific/Palau": {
                c: ["PW"]
            },
            "Pacific/Pitcairn": {
                c: ["PN"]
            },
            "Pacific/Pohnpei": {
                c: ["FM"]
            },
            "Pacific/Ponape": {
                a: "Pacific/Pohnpei",
            },
            "Pacific/Port_Moresby": {
                c: ["PG", "AQ"]
            },
            "Pacific/Rarotonga": {
                c: ["CK"]
            },
            "Pacific/Saipan": {
                a: "Pacific/Guam",
                c: ["MP"],
            },
            "Pacific/Samoa": {
                a: "Pacific/Pago_Pago",
                c: ["WS"],
            },
            "Pacific/Tahiti": {
                c: ["PF"]
            },
            "Pacific/Tarawa": {
                c: ["KI"]
            },
            "Pacific/Tongatapu": {
                c: ["TO"]
            },
            "Pacific/Truk": {
                a: "Pacific/Chuuk",
            },
            "Pacific/Wake": {
                c: ["UM"]
            },
            "Pacific/Wallis": {
                c: ["WF"]
            },
            "Pacific/Yap": {
                a: "Pacific/Chuuk",
            },
            Poland: {
                a: "Europe/Warsaw",
            },
            Portugal: {
                a: "Europe/Lisbon",
            },
            ROC: {
                a: "Asia/Taipei",
            },
            ROK: {
                a: "Asia/Seoul",
            },
            Singapore: {
                a: "Asia/Singapore",
                c: ["SG"],
            },
            Turkey: {
                a: "Europe/Istanbul",
            },
            "US/Alaska": {
                a: "America/Anchorage",
            },
            "US/Aleutian": {
                a: "America/Adak",
            },
            "US/Arizona": {
                a: "America/Phoenix",
                c: ["US"],
            },
            "US/Central": {
                a: "America/Chicago",
            },
            "US/East-Indiana": {
                a: "America/Indiana/Indianapolis",
            },
            "US/Eastern": {
                a: "America/New_York",
            },
            "US/Hawaii": {
                a: "Pacific/Honolulu",
                c: ["US"],
            },
            "US/Indiana-Starke": {
                a: "America/Indiana/Knox",
            },
            "US/Michigan": {
                a: "America/Detroit",
            },
            "US/Mountain": {
                a: "America/Denver",
            },
            "US/Pacific": {
                a: "America/Los_Angeles",
            },
            "US/Samoa": {
                a: "Pacific/Pago_Pago",
                c: ["WS"],
            }
        };
    }


    function getTimezone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }


    function getCountryFromTimezone() {
        const timezones = getTimezones();
        const tz = getTimezone();

        if (tz === "" || !tz) {
            return null;
        }

        const findCountry = (zone) => {
            const tzData = timezones[zone];

            if(tzData) {
                if(tzData.c) {
                    return tzData.c[0];
                }

                if(tzData.a && timezones[tzData.a]) {
                    return findCountry(tzData.a)
                }
            }

            return null;
        }

        return findCountry(tz)
    }


    return {
        getTimezones,
        getTimezone,
        getCountryFromTimezone
    }

}
