import { makeClient, httpConnector } from '@tianhuil/simple-trpc/dist/client'
import { IVbmRpc, processEnvOrThrow } from '@vbm/common'

const serverUrl = processEnvOrThrow('REACT_APP_SERVER')
export const client = makeClient<IVbmRpc>(httpConnector(serverUrl))
