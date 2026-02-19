import React from 'react';

interface FeaturedVehiclesContextType {
  featuredVehicles: Set<string>;
  toggleFeatured: (vehicleId: string) => void;
}

const FeaturedVehiclesContext = React.createContext<FeaturedVehiclesContextType>({
  featuredVehicles: new Set(),
  toggleFeatured: () => {},
});

export function FeaturedVehiclesProvider({ children }: { children: React.ReactNode }) {
  const [featuredVehicles, setFeaturedVehicles] = React.useState<Set<string>>(new Set(['prime-astra', 'neon-rover', 'terra-hauler', 'cargox']));

  const toggleFeatured = (vehicleId: string) => {
    setFeaturedVehicles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(vehicleId)) {
        newSet.delete(vehicleId);
      } else {
        newSet.add(vehicleId);
      }
      return newSet;
    });
  };

  return (
    <FeaturedVehiclesContext.Provider value={{ featuredVehicles, toggleFeatured }}>
      {children}
    </FeaturedVehiclesContext.Provider>
  );
}

export function useFeaturedVehicles() {
  return React.useContext(FeaturedVehiclesContext);
}