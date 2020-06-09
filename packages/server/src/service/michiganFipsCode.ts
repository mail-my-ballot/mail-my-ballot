import fetch from 'node-fetch'
import { cache } from './util'

interface Response {
  features?: {
    attributes?: {
      FIPSCODE?: string
    }
  }[]
}

const rawMichiganResponse = async (latLong: [number, number]): Promise<Response> => {
  const [lat, lng] = latLong
  const url = `https://gisago.mcgi.state.mi.us/arcgis/rest/services/OpenData/michigan_geographic_framework/MapServer/2/query?where=1%3D1&geometry=${lng}%2C${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=pjson`
  return (await (await fetch(url)).json() as Response)
}

export const toFipscode = async (response: Response): Promise<string | null> => {
  return (response?.features ?? [null])[0]?.attributes?.FIPSCODE ?? null
}

export const cacheMichiganResponse = cache(rawMichiganResponse, async([x, y]) => `${x}_${y}`)

export const michiganFipsCode = async (
  latLong: [number, number],
  {cacheQuery} = {cacheQuery: false},
): Promise<string | null> => {
  const call = cacheQuery ? cacheMichiganResponse : rawMichiganResponse
  const response = await call(latLong)
  return toFipscode(response)
}
