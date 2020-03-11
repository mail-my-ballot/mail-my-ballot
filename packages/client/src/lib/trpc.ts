import { makeClient, httpConnector } from '@tianhuil/simple-trpc/dist/client'
import { IVbmRpc, processEnvOrThrow } from '../common'

const serverUrl = processEnvOrThrow('REACT_APP_SERVER')
const timeout = parseInt(processEnvOrThrow('REACT_APP_TIMEOUT'))

export const client = makeClient<IVbmRpc>(
  httpConnector(serverUrl, {timeout})
)
