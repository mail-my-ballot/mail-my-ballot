import React from 'react'
import { HashRouter } from 'react-router-dom'
import { QueryContainer, AddressContainer, ContactContainer, AnalyticsContainer, VoterContainer } from '../lib/unstated'
// export for testing purposes
export const UnstatedContainer: React.FC<{}> = ({ children }) => (<HashRouter>
  <QueryContainer.Provider>
    <AddressContainer.Provider>
      <ContactContainer.Provider>
        <AnalyticsContainer.Provider>
          <VoterContainer.Provider>
            {children}
          </VoterContainer.Provider>
        </AnalyticsContainer.Provider>
      </ContactContainer.Provider>
    </AddressContainer.Provider>
  </QueryContainer.Provider>
</HashRouter>)
