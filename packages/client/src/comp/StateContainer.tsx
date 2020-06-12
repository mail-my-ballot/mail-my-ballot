import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Slide, ToastContainer } from "react-toastify"
import { ModalProvider } from 'styled-react-modal'
import { QueryContainer, AddressContainer, ContactContainer, AnalyticsContainer, VoterContainer, FeatureFlagsContainer } from '../lib/unstated'

import 'react-toastify/dist/ReactToastify.css'

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
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={true}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss={true}
                  pauseOnHover={true}
                  transition={Slide}
                />
              </ModalProvider>
            </VoterContainer.Provider>
          </FeatureFlagsContainer.Provider>
        </AnalyticsContainer.Provider>
      </ContactContainer.Provider>
    </AddressContainer.Provider>
  </QueryContainer.Provider>
</HashRouter>)
