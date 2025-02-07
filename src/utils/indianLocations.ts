interface CityData {
  [city: string]: string; // city name -> state name
}

interface PincodeData {
  [pincode: string]: {
    city: string;
    state: string;
  };
}

export const indianPincodes: PincodeData = {
  // Mumbai, Maharashtra
  "400001": { city: "Mumbai", state: "Maharashtra" },
  "400002": { city: "Mumbai", state: "Maharashtra" },
  "400051": { city: "Mumbai", state: "Maharashtra" }, // Andheri
  "400053": { city: "Mumbai", state: "Maharashtra" }, // Bandra
  "400069": { city: "Mumbai", state: "Maharashtra" }, // Malad
  "400076": { city: "Mumbai", state: "Maharashtra" }, // Powai
  "400097": { city: "Mumbai", state: "Maharashtra" }, // Borivali
  "400049": { city: "Mumbai", state: "Maharashtra" }, // Kandivali
  "400064": { city: "Mumbai", state: "Maharashtra" }, // Goregaon
  "400055": { city: "Mumbai", state: "Maharashtra" }, // Santacruz
  "400058": { city: "Mumbai", state: "Maharashtra" }, // Jogeshwari
  
  // Delhi
  "110001": { city: "Delhi", state: "Delhi" },
  "110002": { city: "Delhi", state: "Delhi" },
  "110020": { city: "Delhi", state: "Delhi" }, // South Delhi
  "110034": { city: "Delhi", state: "Delhi" }, // West Delhi
  "110044": { city: "Delhi", state: "Delhi" }, // East Delhi
  "110092": { city: "Delhi", state: "Delhi" }, // North Delhi
  "110075": { city: "Delhi", state: "Delhi" }, // Dwarka
  "110085": { city: "Delhi", state: "Delhi" }, // Rohini
  "110096": { city: "Delhi", state: "Delhi" }, // Pitampura
  
  // Bangalore, Karnataka
  "560001": { city: "Bangalore", state: "Karnataka" },
  "560002": { city: "Bangalore", state: "Karnataka" },
  "560034": { city: "Bangalore", state: "Karnataka" }, // JP Nagar
  "560037": { city: "Bangalore", state: "Karnataka" }, // Jayanagar
  "560043": { city: "Bangalore", state: "Karnataka" }, // Whitefield
  "560066": { city: "Bangalore", state: "Karnataka" }, // Electronic City
  "560095": { city: "Bangalore", state: "Karnataka" }, // Marathahalli
  "560064": { city: "Bangalore", state: "Karnataka" }, // Bannerghatta
  "560103": { city: "Bangalore", state: "Karnataka" }, // Bellandur
  "560048": { city: "Bangalore", state: "Karnataka" }, // Malleswaram
  "560011": { city: "Bangalore", state: "Karnataka" }, // Koramangala
  
  // Hyderabad, Telangana
  "500001": { city: "Hyderabad", state: "Telangana" },
  "500002": { city: "Hyderabad", state: "Telangana" },
  "500032": { city: "Hyderabad", state: "Telangana" }, // Secunderabad
  "500034": { city: "Hyderabad", state: "Telangana" }, // Banjara Hills
  "500081": { city: "Hyderabad", state: "Telangana" }, // Hi-Tech City
  "500084": { city: "Hyderabad", state: "Telangana" }, // Gachibowli
  "500072": { city: "Hyderabad", state: "Telangana" }, // Kukatpally
  "500045": { city: "Hyderabad", state: "Telangana" }, // Jubilee Hills
  "500018": { city: "Hyderabad", state: "Telangana" }, // Ameerpet
  
  // Chennai, Tamil Nadu
  "600001": { city: "Chennai", state: "Tamil Nadu" },
  "600002": { city: "Chennai", state: "Tamil Nadu" },
  "600040": { city: "Chennai", state: "Tamil Nadu" }, // T Nagar
  "600042": { city: "Chennai", state: "Tamil Nadu" }, // Anna Nagar
  "600096": { city: "Chennai", state: "Tamil Nadu" }, // Velachery
  "600119": { city: "Chennai", state: "Tamil Nadu" }, // OMR
  "600095": { city: "Chennai", state: "Tamil Nadu" }, // Sholinganallur
  "600097": { city: "Chennai", state: "Tamil Nadu" }, // Tambaram
  "600028": { city: "Chennai", state: "Tamil Nadu" }, // Adyar
  
  // Kolkata, West Bengal
  "700001": { city: "Kolkata", state: "West Bengal" },
  "700002": { city: "Kolkata", state: "West Bengal" },
  "700019": { city: "Kolkata", state: "West Bengal" }, // Ballygunge
  "700064": { city: "Kolkata", state: "West Bengal" }, // Salt Lake
  "700091": { city: "Kolkata", state: "West Bengal" }, // New Town
  "700053": { city: "Kolkata", state: "West Bengal" }, // Park Street
  "700028": { city: "Kolkata", state: "West Bengal" }, // Alipore
  "700061": { city: "Kolkata", state: "West Bengal" }, // Howrah
  
  // Kerala
  "682001": { city: "Kochi", state: "Kerala" }, // Ernakulam
  "682002": { city: "Kochi", state: "Kerala" },
  "682020": { city: "Kochi", state: "Kerala" }, // Kakkanad
  "682024": { city: "Kochi", state: "Kerala" }, // Fort Kochi
  "682030": { city: "Kochi", state: "Kerala" }, // Aluva
  "682037": { city: "Kochi", state: "Kerala" }, // Tripunithura
  "695001": { city: "Thiruvananthapuram", state: "Kerala" },
  "695002": { city: "Thiruvananthapuram", state: "Kerala" },
  "695011": { city: "Thiruvananthapuram", state: "Kerala" }, // Technopark
  "695024": { city: "Thiruvananthapuram", state: "Kerala" }, // Kovalam
  "673001": { city: "Kozhikode", state: "Kerala" },
  "673002": { city: "Kozhikode", state: "Kerala" },
  "673004": { city: "Kozhikode", state: "Kerala" }, // Beach Road
  "673014": { city: "Kozhikode", state: "Kerala" }, // Cyber Park
  "680001": { city: "Thrissur", state: "Kerala" },
  "680002": { city: "Thrissur", state: "Kerala" },
  "680021": { city: "Thrissur", state: "Kerala" }, // Ayyanthole
  "686001": { city: "Kottayam", state: "Kerala" },
  "686002": { city: "Kottayam", state: "Kerala" },
  "679101": { city: "Palakkad", state: "Kerala" },
  "679102": { city: "Palakkad", state: "Kerala" },
  
  // Gujarat
  "380001": { city: "Ahmedabad", state: "Gujarat" },
  "380002": { city: "Ahmedabad", state: "Gujarat" },
  "380015": { city: "Ahmedabad", state: "Gujarat" }, // Satellite
  "380054": { city: "Ahmedabad", state: "Gujarat" }, // Bopal
  "380061": { city: "Ahmedabad", state: "Gujarat" }, // SG Highway
  "395001": { city: "Surat", state: "Gujarat" },
  "395002": { city: "Surat", state: "Gujarat" },
  "395007": { city: "Surat", state: "Gujarat" }, // Adajan
  "395009": { city: "Surat", state: "Gujarat" }, // Vesu
  "390001": { city: "Vadodara", state: "Gujarat" },
  "390002": { city: "Vadodara", state: "Gujarat" },
  "390007": { city: "Vadodara", state: "Gujarat" }, // Alkapuri
  "390023": { city: "Vadodara", state: "Gujarat" }, // Gotri
  
  // Uttar Pradesh
  "226001": { city: "Lucknow", state: "Uttar Pradesh" },
  "226002": { city: "Lucknow", state: "Uttar Pradesh" },
  "226010": { city: "Lucknow", state: "Uttar Pradesh" }, // Gomti Nagar
  "226016": { city: "Lucknow", state: "Uttar Pradesh" }, // Hazratganj
  "201301": { city: "Noida", state: "Uttar Pradesh" },
  "201304": { city: "Noida", state: "Uttar Pradesh" }, // Sector 62
  "201307": { city: "Greater Noida", state: "Uttar Pradesh" },
  "201308": { city: "Greater Noida", state: "Uttar Pradesh" },
  "201310": { city: "Greater Noida", state: "Uttar Pradesh" }, // Knowledge Park
  "208001": { city: "Kanpur", state: "Uttar Pradesh" },
  "208002": { city: "Kanpur", state: "Uttar Pradesh" },
  "221001": { city: "Varanasi", state: "Uttar Pradesh" },
  "221002": { city: "Varanasi", state: "Uttar Pradesh" },
  
  // Rajasthan
  "302001": { city: "Jaipur", state: "Rajasthan" },
  "302002": { city: "Jaipur", state: "Rajasthan" },
  "302015": { city: "Jaipur", state: "Rajasthan" }, // Malviya Nagar
  "302017": { city: "Jaipur", state: "Rajasthan" }, // Vaishali Nagar
  "302020": { city: "Jaipur", state: "Rajasthan" }, // Mansarovar
  "302033": { city: "Jaipur", state: "Rajasthan" }, // C-Scheme
  "313001": { city: "Udaipur", state: "Rajasthan" },
  "313002": { city: "Udaipur", state: "Rajasthan" },
  "342001": { city: "Jodhpur", state: "Rajasthan" },
  "342002": { city: "Jodhpur", state: "Rajasthan" },
  
  // Punjab & Chandigarh
  "160001": { city: "Chandigarh", state: "Punjab" },
  "160002": { city: "Chandigarh", state: "Punjab" },
  "160017": { city: "Chandigarh", state: "Punjab" }, // IT Park
  "160036": { city: "Chandigarh", state: "Punjab" }, // Industrial Area
  "160047": { city: "Chandigarh", state: "Punjab" }, // Manimajra
  "141001": { city: "Ludhiana", state: "Punjab" },
  "141002": { city: "Ludhiana", state: "Punjab" },
  "144001": { city: "Jalandhar", state: "Punjab" },
  "144002": { city: "Jalandhar", state: "Punjab" },
  "143001": { city: "Amritsar", state: "Punjab" },
  "143002": { city: "Amritsar", state: "Punjab" },
  
  // Madhya Pradesh
  "462001": { city: "Bhopal", state: "Madhya Pradesh" },
  "462002": { city: "Bhopal", state: "Madhya Pradesh" },
  "462016": { city: "Bhopal", state: "Madhya Pradesh" }, // Arera Colony
  "462026": { city: "Bhopal", state: "Madhya Pradesh" }, // MP Nagar
  "452001": { city: "Indore", state: "Madhya Pradesh" },
  "452002": { city: "Indore", state: "Madhya Pradesh" },
  "452010": { city: "Indore", state: "Madhya Pradesh" }, // Vijay Nagar
  "452018": { city: "Indore", state: "Madhya Pradesh" }, // Palasia
  "482001": { city: "Jabalpur", state: "Madhya Pradesh" },
  "482002": { city: "Jabalpur", state: "Madhya Pradesh" },
  "485001": { city: "Gwalior", state: "Madhya Pradesh" },
  "485002": { city: "Gwalior", state: "Madhya Pradesh" },
  
  // Karnataka (Additional cities)
  "570001": { city: "Mysore", state: "Karnataka" },
  "570002": { city: "Mysore", state: "Karnataka" },
  "570020": { city: "Mysore", state: "Karnataka" }, // Vijayanagar
  "580001": { city: "Hubli", state: "Karnataka" },
  "580002": { city: "Hubli", state: "Karnataka" },
  "580020": { city: "Hubli", state: "Karnataka" }, // Vidyanagar
  "590001": { city: "Belgaum", state: "Karnataka" },
  "590002": { city: "Belgaum", state: "Karnataka" },
  "575001": { city: "Mangalore", state: "Karnataka" },
  "575002": { city: "Mangalore", state: "Karnataka" },
  
  // Maharashtra (Additional cities)
  "440001": { city: "Nagpur", state: "Maharashtra" },
  "440002": { city: "Nagpur", state: "Maharashtra" },
  "440010": { city: "Nagpur", state: "Maharashtra" }, // Dharampeth
  "440022": { city: "Nagpur", state: "Maharashtra" }, // Ramdaspeth
  "411001": { city: "Pune", state: "Maharashtra" },
  "411002": { city: "Pune", state: "Maharashtra" },
  "411014": { city: "Pune", state: "Maharashtra" }, // Hinjewadi
  "411027": { city: "Pune", state: "Maharashtra" }, // Hadapsar
  "411057": { city: "Pune", state: "Maharashtra" }, // Wakad
  "411006": { city: "Pune", state: "Maharashtra" }, // Deccan
  "411004": { city: "Pune", state: "Maharashtra" }, // Camp
  "431001": { city: "Aurangabad", state: "Maharashtra" },
  "431002": { city: "Aurangabad", state: "Maharashtra" },
  "400614": { city: "Navi Mumbai", state: "Maharashtra" }, // Vashi
  "400705": { city: "Navi Mumbai", state: "Maharashtra" }  // Kharghar
};

export const indianCities: CityData = {
  "Mumbai": "Maharashtra",
  "Navi Mumbai": "Maharashtra",
  "Delhi": "Delhi",
  "Bangalore": "Karnataka",
  "Hyderabad": "Telangana",
  "Chennai": "Tamil Nadu",
  "Kolkata": "West Bengal",
  "Pune": "Maharashtra",
  "Ahmedabad": "Gujarat",
  "Surat": "Gujarat",
  "Vadodara": "Gujarat",
  "Lucknow": "Uttar Pradesh",
  "Kanpur": "Uttar Pradesh",
  "Varanasi": "Uttar Pradesh",
  "Noida": "Uttar Pradesh",
  "Greater Noida": "Uttar Pradesh",
  "Jaipur": "Rajasthan",
  "Udaipur": "Rajasthan",
  "Jodhpur": "Rajasthan",
  "Kochi": "Kerala",
  "Thiruvananthapuram": "Kerala",
  "Kozhikode": "Kerala",
  "Thrissur": "Kerala",
  "Kottayam": "Kerala",
  "Palakkad": "Kerala",
  "Bhopal": "Madhya Pradesh",
  "Indore": "Madhya Pradesh",
  "Jabalpur": "Madhya Pradesh",
  "Gwalior": "Madhya Pradesh",
  "Chandigarh": "Punjab",
  "Ludhiana": "Punjab",
  "Jalandhar": "Punjab",
  "Amritsar": "Punjab",
  "Coimbatore": "Tamil Nadu",
  "Mysore": "Karnataka",
  "Hubli": "Karnataka",
  "Belgaum": "Karnataka",
  "Mangalore": "Karnataka",
  "Nagpur": "Maharashtra",
  "Aurangabad": "Maharashtra",
  "Visakhapatnam": "Andhra Pradesh"
};

export const indianStates = Array.from(new Set(Object.values(indianCities))).sort();

export function getStateFromCity(city: string): string | undefined {
  return indianCities[city];
}

export function getCitySuggestions(input: string): string[] {
  const inputLower = input.toLowerCase();
  return Object.keys(indianCities)
    .filter(city => city.toLowerCase().includes(inputLower))
    .sort();
}

export function getLocationFromPincode(pincode: string): { city: string; state: string } | undefined {
  return indianPincodes[pincode];
}
