import { Locale } from "./locale"
import { ImplementedState } from "./stateInfo"

export interface AddressData extends Locale<ImplementedState> {
  address: string
}

// The Chamber of Commerce for the 3 largest cities in the state
// and others addresses as necessary
export const sampleAddresses: Record<ImplementedState, AddressData[]> = {
  'Arizona': [{
    address: '201 N Central Ave, Phoenix, AZ 85004',
    city: 'Phoenix',
    county: 'Maricopa County',
    state: 'Arizona',
  }, {
    address: '212 E Broadway Blvd, Tucson, AZ 85701',
    city: 'Tucson',
    county: 'Pima County',
    state: 'Arizona',
  }, {
    address: '165 N Centennial Way, Mesa, AZ 85201',
    city: 'Mesa',
    county: 'Maricopa County',
    state: 'Arizona',
  }],
  'Florida': [{
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
  }],
  'Michigan': [{
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
  }],
  'Georgia': [{
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
  }],
  'Wisconsin': [{
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
  }],
  'Nebraska': [{
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
  }],
  'Maryland': [{
    address: '240 W Dickman St, Baltimore, MD 21230',
    city: 'Baltimore',
    state: 'Maryland',
  }, {
    address: '118 N Market St, Frederick, MD 21701',
    city: 'Frederick',
    county: 'Frederick County',
    state: 'Maryland',
  }, {
    address: '1 Research Ct, Rockville, MD 20850',
    city: 'Rockville',
    county: 'Montgomery County',
    state: 'Maryland',
  }],
  'Maine': [{
    address: '443 Congress St, Portland, ME 04101',
    city: 'Portland',
    county: 'Cumberland County',
    state: 'Maine',
  }, {
    address: '415 Lisbon St, Lewiston, ME 04240',
    city: 'Lewiston',
    county: 'Androscoggin County',
    state: 'Maine',
  }, {
    address: '2 Hammond St, Bangor, ME 04401',
    city: 'Bangor',
    county: 'Penobscot County',
    state: 'Maine',
  }],
  'Minnesota': [{
    address: '81 S 9th St Suite 200, Minneapolis, MN 55402',
    city: 'Minneapolis',
    county: 'Hennepin County',
    state: 'Minnesota',
  }, {
    address: '401 Robert St N #150, St Paul, MN 55101',
    city: 'St Paul',
    county: 'Ramsey County',
    state: 'Minnesota',
  }, {
    address: '220 S Broadway STE 100, Rochester, MN 55904',
    city: 'Rochester',
    county: 'Olmsted County',
    state: 'Minnesota',
  }],
  'Nevada': [{
    address: '575 W Symphony Park Ave, Las Vegas, NV 89106',
    city: 'Las Vegas',
    county: 'Clark County',
    state: 'Nevada',
  }, {
    address: '400 N Green Valley Pkwy, Henderson, NV 89074',
    city: 'Henderson',
    county: 'Clark County',
    state: 'Nevada',
  }, {
    address: '449 S Virginia St, Reno, NV 89501',
    city: 'Reno',
    county: 'Washoe County',
    state: 'Nevada',
  }, {
    address: '1900 S Carson St, Carson City, NV 89701',
    city: 'Carson City',
    state: 'Nevada',
  }],
  'New Hampshire': [{
    address: '54 Hanover St, Manchester, NH 03101',
    city: 'Manchester',
    county: 'Hillsborough County',
    state: 'New Hampshire',
  }, {
    address: '29 W Broadway, Derry, NH 03038',
    city: 'Derry',
    county: 'Rockingham County',
    state: 'New Hampshire',
  }, {
    address: '49 S Main St Suite 104, Concord, NH 03301',
    city: 'Concord',
    county: 'Merrimack County',
    state: 'New Hampshire',
  }],
  'New York': [{
    address: '335 Adams St #2700, Brooklyn, NY 11201',
    city: 'Brooklyn',
    county: 'Kings County',
    state: 'New York',
  }, {
    address: '257 W Genesee St #600, Buffalo, NY 14202',
    city: 'Buffalo',
    county: 'Erie County',
    state: 'New York',
  }, {
    address: '5 Computer Dr S, Albany, NY 12205',
    city: 'Albany',
    county: 'Albany County',
    state: 'New York',
  }],
  'North Carolina': [{
    address: '615 S College St, Charlotte, NC 28202',
    city: 'Charlotte',
    county: 'Mecklenburg County',
    state: 'North Carolina',
  }, {
    address: '800 S Salisbury St, Raleigh, NC 27602',
    city: 'Raleigh',
    county: 'Wake County',
    state: 'North Carolina',
  }, {
    address: '111 W February 1 Pl, Greensboro, NC 27401',
    city: 'Greensboro',
    county: 'Guilford County',
    state: 'North Carolina',
  }],
  'Oklahoma': [
    {
      address: '330 NE 10th St, Oklahoma City, OK 73104',
      city: 'Oklahoma City',
      county: 'Oklahoma County',
      state: 'Oklahoma'
    },
    {
      address: '1 W 3rd St, Tulsa, OK 74103',
      city: 'Tulsa',
      county: 'Tulsa County',
      state: 'Oklahoma'
    },
    {
      address: '115 E Gray St, Norman, OK 73069',
      city: 'Norman',
      county: 'Cleveland County',
      state: 'Oklahoma'
    }
  ],
  'Wyoming': [{
    address: '121 W 15th St #204, Cheyenne, WY 82001',
    city: 'Cheyenne',
    county: 'Laramie County',
    state: 'Wyoming',
  }, {
    address: '500 N Center St, Casper, WY 82601',
    city: 'Casper',
    county: 'Natrona County',
    state: 'Wyoming',
  }, {
    address: '800 S 3rd St, Laramie, WY 82070',
    city: 'Laramie',
    county: 'Albany County',
    state: 'Wyoming',
  }],
}
