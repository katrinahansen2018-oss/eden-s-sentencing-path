import { SimulationProvider } from '@/contexts/SimulationContext';
import { SimulationContainer } from '@/components/simulation/SimulationContainer';

const Index = () => {
  return (
    <SimulationProvider>
      <SimulationContainer />
    </SimulationProvider>
  );
};

export default Index;
