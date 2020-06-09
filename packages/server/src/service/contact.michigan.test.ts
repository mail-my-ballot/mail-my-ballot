import { getMichiganContact } from './contact'
import { cachedRawGeocode, toAddress } from './gm'

// from: https://en.wikipedia.org/wiki/List_of_municipalities_in_Michigan
const addresses: [string, string][] = [
  // top 10 municipalities in Michigan
  ['2648 W Grand Blvd, Detroit, MI 48208', 'Detroit City:Wayne County'],
  ['834 Leonard St NE, Grand Rapids, MI 49503', 'Grand Rapids City:Kent County'],
  ['30100 Campbell Ave, Warren, MI 48093', 'Warren City:Macomb County'],
  ['5150 Rudgate Cir, Sterling Heights, MI 48310', 'Sterling Heights City:Macomb County'],
  ['4230 S Martin Luther King Jr Blvd, Lansing, MI 48910', 'Lansing City:Ingham County'],
  ['1120 E Kearsley St, Flint, MI 48503', 'Flint City:Genesee County'],
  ['1231 Van Dusen Dr, Ann Arbor, MI 48103', 'Ann Arbor City:Washtenaw County'],
  ['15264 Michigan Ave, Dearborn, MI 48126', 'Dearborn City:Wayne County'],
  ['35301 Five Mile Rd, Livonia, MI 48154', 'Livonia City:Wayne County'],
  ['43350 Elizabeth Rd, Clinton Twp, MI 48036', 'Clinton Township:Macomb County'],

  // Google returns "Canton" for locality and we try it as Township
  ['44500 Cherry Hill Rd, Canton, MI 48187', 'Canton Township:Wayne County'],
  ['17051 24 Mile Rd, Macomb, MI 48042', 'Macomb Township:Macomb County'],
  ['46155 Schoenherr Rd, Shelby Charter Twp, MI 48315', 'Shelby Charter Township:Macomb County'],
  ['3882 Highland Rd, Waterford Twp, MI 48328', 'Waterford Township:Oakland County'],
  ['4100 Walnut Lake Rd, West Bloomfield Township, MI 48323', 'West Bloomfield Township:Oakland County'],
  ['20 N Washington St, Ypsilanti, MI 48197', 'Ypsilanti City:Washtenaw County'],
  // Google only return Ypsilanti
  ['7180 S Huron River Dr, Ypsilanti, MI 48197', 'Ypsilanti Township:Washtenaw County'],
  // Google calls this Redford City Township but the state calls it Redford Township
  ['14841 Beech Daly, Redford Charter Twp, MI 48239', 'Redford Township:Wayne County'],
  ['2766 Baldwin St, Jenison, MI 49428', 'Georgetown Township:Ottawa County'],
  // administrative_area_level_3 is "Chesterfield Township" but locality is "New Baltimore", preference for administrative_area_level_3?
  ['54205 Washington St, Chesterfield, MI 48047', 'Chesterfield Township:Macomb County'],
  // should be "Bloomfield Township" but Google maps it to "Bloomfield Hills"
  ['3600 Telegraph Rd, Bloomfield Twp, MI 48302', 'Bloomfield Township:Oakland County'],
  // administrative_area_level_3 is "Saginaw Charter Township", but polity is "Saginaw"
  ['4873 N Center Rd, Saginaw, MI 48608', 'Saginaw Township:Saginaw County'],
  ['1155 N Commerce Rd, Commerce Charter Twp, MI 48382', 'Commerce Township:Oakland County'],
  ['5165 Marsh Rd, Okemos, MI 48864', 'Meridian Township:Ingham County'],
  ['515 Bush Ave, Grand Blanc, MI 48439', 'Grand Blanc City:Genesee County'],  // Grand Blanc City
  // Google returns "Grand Blanc" for polity
  ['6106 S Saginaw St, Grand Blanc, MI 48439', 'Grand Blanc Township:Genesee County'],  // Grand Blanc Township
  // "Holland Charter Township" is administrative_area_level_3 but "Holland" is locality
  ['12251 James Street, Holland, MI 49424', 'Holland Township:Ottawa County'],  // from https://mvic.sos.state.mi.us/Clerk
  ['12220 Fillmore Street, Room 130, West Olive, MI 49460', 'Olive Township:Ottawa County'],  // from https://mvic.sos.state.mi.us/Clerk
  ['414 Washington Ave, Room 115, Grand Haven, MI 49417', 'Grand Haven City:Ottawa County'],  // from https://mvic.sos.state.mi.us/Clerk
  ['3920 Baldwin Rd, Orion Charter Township, MI 48359', 'Orion Township:Oakland County'],
  // Google API claims it's in Clarkston, which it's not
  ['5464 Waterford Rd, Independence Charter Township, MI 48346', 'Independence Township:Oakland County'],
  // Just receive Lansing, not Delta Charter Township
  ['1000 S Canal Rd, Lansing, MI 48917', 'Delta Charter Township:Eaton County'],
  // Google only returns Flint for locality but it should be township
  ['4313 Corunna Rd, Flint, MI 48532', 'Flint Township:Genesee County'],
  ['8970 Jackman Rd, Temperance, MI 48182', 'Bedford Township:Monroe County'],
  ['6390 Belmont Ave NE, Belmont, MI 49306', 'Plainfield Township:Kent County'],
  // Google returns Grand Rapids
  ['4411 Plainfield Ave NE, Grand Rapids, MI 49525', 'Plainfield Township:Kent County'],
  ['21516 Telegraph Rd, Brownstown Charter Twp, MI 48183', 'Brownstown Township:Wayne County'],
  ['32414 W Jefferson Ave, Rockwood, MI 48173', 'Brownstown Township:Wayne County'],
  ['1730 Mead Ln, White Lake, MI 48386', 'White Lake Township:Oakland County'],

  // Special cases
  ['10995 W Jefferson Ave, River Rouge, MI 48229', 'River Rouge City:Wayne County'],
  ['916 Parkview Ave, Battle Creek, MI 49017, USA', 'Pennfield Township:Calhoun County'],
  ['117 W Prudence Ln, Battle Creek, MI 49037, USA', 'Bedford Township:Calhoun County'],
  // Google just returns Ann Arbor for locality
  ['2376 Westbrooke Cir N, Ann Arbor, MI 48105', 'Ann Arbor Township:Washtenaw County'],
  ['21385 Glen Lodge Rd, Ferndale, MI 48220, USA', 'Royal Oak Township:Oakland County']
]

test.each(addresses)(
  'Checking Michigan Geocoding %s',
  async (addr, locality) => {
    // This function breaks up geocoding into it's parts so that we can cache and get errMsg
    const geoResult = await cachedRawGeocode(addr)
    expect(geoResult).toBeTruthy()
    const errMsg = `Google Result was ${JSON.stringify(geoResult?.address_components, null, 2)}`
  
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const address = toAddress(geoResult!)
    expect(address, errMsg).toBeTruthy()
    expect(address?.latLong, errMsg).toBeTruthy()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const contact = await getMichiganContact(address?.latLong!, {cacheQuery: true})
  
    expect(contact, errMsg).toBeTruthy()
    expect(
      contact?.city + ':' + contact?.county,
      errMsg,
    ).toEqual(locality)
  }
)
