import React, { createContext, useState, useContext, ReactNode } from 'react';

type Address = {
  streetAddress: string;
  city: string;
  state: string;
  postcode: string;
};

type AddressContextType = {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
};

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  return (
    <AddressContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === null) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};

