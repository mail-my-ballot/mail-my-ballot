import React from 'react'
import { HashRouter } from 'react-router-dom'
import { QueryContainer, AddressContainer, ContactContainer, AnalyticsContainer } from '../lib/unstated'
// export for testing purposes
export const UnstatedContainer: React.FC<{}> = ({ children }) => (<HashRouter>
  <QueryContainer.Provider>
    <AddressContainer.Provider>
      <ContactContainer.Provider>
        <AnalyticsContainer.Provider>
          {children}
        </AnalyticsContainer.Provider>
      </ContactContainer.Provider>
    </AddressContainer.Provider>
  </QueryContainer.Provider>
</HashRouter>)
