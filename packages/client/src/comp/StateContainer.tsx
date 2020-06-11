import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Slide, ToastContainer } from "react-toastify"
import { ModalProvider } from 'styled-react-modal'
import { QueryContainer, AddressContainer, ContactContainer, AnalyticsContainer, VoterContainer, FeatureFlagsContainer } from '../lib/unstated'

import 'react-toastify/dist/ReactToastify.css'

// For some reason on the current design toasts placed on the botton are
// not shown on top of the Blurb
const toastPosition = () => {
  return window.matchMedia('(max-width: 991px)').matches
    ? 'top-center'
    : 'bottom-right'
}

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
                  position={toastPosition()}
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
