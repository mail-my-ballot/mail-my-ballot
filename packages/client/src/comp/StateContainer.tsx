import React from 'react'
import styled from 'styled-components'
import { HashRouter } from 'react-router-dom'
import { Slide, ToastContainer } from "react-toastify"
import { ModalProvider } from 'styled-react-modal'
import { AddressContainer, ContactContainer, AnalyticsContainer, ExperimentContainer, FeatureFlagsContainer, FetchingDataContainer } from '../lib/unstated'

import 'react-toastify/dist/ReactToastify.css'
import { LoadingOverlay } from './util/LoadingOverlay'

const CustomToastContainer = styled(ToastContainer)`
  @media screen and (min-width: 592px) {
    & .Toastify__toast {
      border-radius: 4px;
      text-align: center;
    }
  }
`

// export for testing purposes
export const UnstatedContainer: React.FC<{}> = ({ children }) => (<HashRouter>
  <AddressContainer.Provider>
    <ContactContainer.Provider>
      <AnalyticsContainer.Provider>
        <FeatureFlagsContainer.Provider>
          <ExperimentContainer.Provider>
            <ModalProvider>
              <FetchingDataContainer.Provider>
                {children}
                <LoadingOverlay/>
                <CustomToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={true}
                  newestOnTop={true}
                  closeOnClick={true}
                  rtl={false}
                  limit={2}
                  pauseOnFocusLoss={true}
                  pauseOnHover={true}
                  transition={Slide}
                />
              </FetchingDataContainer.Provider>
            </ModalProvider>
          </ExperimentContainer.Provider>
        </FeatureFlagsContainer.Provider>
      </AnalyticsContainer.Provider>
    </ContactContainer.Provider>
  </AddressContainer.Provider>
</HashRouter>)
