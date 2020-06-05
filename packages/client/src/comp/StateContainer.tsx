import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ModalProvider } from 'styled-react-modal'
import { QueryContainer, AddressContainer, ContactContainer, AnalyticsContainer, VoterContainer, FeatureFlagsContainer } from '../lib/unstated'


// export for testing purposes
export const UnstatedContainer: React.FC<{}> = ({ children }) => (<HashRouter>
  <QueryContainer.Provider>
    <AddressContainer.Provider>
      <ContactContainer.Provider>
        <AnalyticsContainer.Provider>
          <FeatureFlagsContainer.Provider>
            <VoterContainer.Provider>
              <ModalProvider>
                {children}
              </ModalProvider>
            </VoterContainer.Provider>
          </FeatureFlagsContainer.Provider>
        </AnalyticsContainer.Provider>
      </ContactContainer.Provider>
    </AddressContainer.Provider>
  </QueryContainer.Provider>
</HashRouter>)
