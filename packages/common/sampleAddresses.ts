import { Address } from "./address"
import { Locale } from "./locale"

export const sampleFloridaAddress: Address = {
  'fullAddr': '100, Biscayne Boulevard, The Roads, Miami, Miami-Dade County, Florida, 33131, United States of America',
  'queryAddr': '100 S Biscayne Blvd, Miami, FL 33131',
  'city': 'Miami',
  'county': 'Miami-Dade County',
  'postcode': '33131',
  'state': 'Florida',
  'country': 'United States of America',
}

export const sampleAddress = sampleFloridaAddress

export interface AddressData extends Locale {
  address: string
}

export const sampleAddresses: AddressData[] = [
  {
    address: '100 S Biscayne Blvd, Miami, FL 33131',
    city: 'Miami',
    county: 'Miami-Dade County',
    state: 'Florida',
  }, {
    address: '5443 Main St, Port Richey, FL 34652',
    city: 'Port Richey',
    county: 'Pasco County',
    state: 'Florida',
  }, {
    address: '2000 W Commercial Blvd, Fort Lauderdale, FL 33309',
    city: 'Fort Lauderdale',
    county: 'Broward County',
    state: 'Florida',
  }, {
    address: '45525 Hanford Rd, Canton, MI 48187',
    city: 'Canton',
    county: 'Wayne County',
    state: 'Michigan',
  }, {
    address: '24624 W Warren St, Dearborn Heights 48127, MI',
    city: 'Dearborn Heights',
    county: 'Wayne County',
    state: 'Michigan',
  }, {
    address: '22100 Michigan Ave. Dearborn, MI 48124',
    city: 'Dearborn',
    county: 'Wayne County',
    state: 'Michigan',
  }, {
    address: '700 Broad Street St Joseph, MI 49085',
    city: 'St. Joseph',
    county: 'Berrien County',
    state: 'Michigan',
  }, {
    address: '2724 Peck St, MI 49444',
    city: 'Muskegon Heights',
    county: 'Muskegon County',
    state: 'Michigan',
  }, {
    address: '191 Peachtree St NE, Atlanta, GA 30303',
    city: 'Atlanta',
    county: 'Fulton County',
    state: 'Georgia',
  }, {
    address: '1 10th St, Augusta, GA 30901',
    city: 'Augusta',
    county: 'Richmond County',
    state: 'Georgia',
  }, {
    address: '1200 6th Ave, Columbus, GA 31902',
    city: 'Columbus',
    county: 'Muscogee County',
    state: 'Georgia',
  }, {
    address: '305 Coliseum Dr, Macon, GA 31217',
    city: 'Macon',
    county: 'Bibb County',
    state: 'Georgia',
  }, {
    address: '756 N Milwaukee St, Milwaukee, WI 53202',
    city: 'Milwaukee',
    county: 'Milwaukee County',
    state: 'Wisconsin',
  }, {
    address: '1 S Pinckney St, Madison, WI 53703',
    city: 'Madison',
    county: 'Dane County',
    state: 'Wisconsin',
  }, {
    address: '300 N Broadway, Green Bay, WI 54303',
    city: 'Green Bay',
    county: 'Brown County',
    state: 'Wisconsin',
  }, {
    address: '808 Conagra Dr, Omaha, NE 68102',
    city: 'Omaha',
    county: 'Douglas County',
    state: 'Nebraska',
  }, {
    address: '1320 Lincoln Mall, Lincoln, NE 68508',
    city: 'Lincoln',
    county: 'Lancaster County',
    state: 'Nebraska',
  }, {
    address: '923 Galvin Rd S, Bellevue, NE 68005',
    city: 'Bellevue',
    county: 'Sarpy County',
    state: 'Nebraska',
  }, {
    address: '240 W Dickman St, Baltimore, MD 21230',
    city: 'Baltimore',
    county: 'Howard County',
    state: 'Maryland',
  }, {
    address: '118 N Market St, Frederick, MD 2170',
    city: 'Frederick',
    county: 'Frederick County',
    state: 'Maryland',
  }, {
    address: '1 Research Ct, Rockville, MD 20850',
    city: 'Rockville',
    county: 'Montgomery County',
    state: 'Maryland',
  }
]
