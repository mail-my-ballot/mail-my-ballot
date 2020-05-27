import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import { QueryContainer, AddressContainer, ContactContainer, AnalyticsContainer, VoterContainer, ZipFinderContainer } from '../lib/unstated'
import 'react-toastify/dist/ReactToastify.css'

const toastPosition = () => {
  return window.matchMedia('(max-width: 991px)').matches
    ? 'top-center'
    : 'bottom-right'
}

// export for testing purposes
export const UnstatedContainer: React.FC<{}> = ({ children }) => (<HashRouter>
  <ZipFinderContainer.Provider>
    <QueryContainer.Provider>
      <AddressContainer.Provider>
        <ContactContainer.Provider>
          <AnalyticsContainer.Provider>
            <VoterContainer.Provider>
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
            </VoterContainer.Provider>
          </AnalyticsContainer.Provider>
        </ContactContainer.Provider>
      </AddressContainer.Provider>
    </QueryContainer.Provider>
  </ZipFinderContainer.Provider>
</HashRouter>)
