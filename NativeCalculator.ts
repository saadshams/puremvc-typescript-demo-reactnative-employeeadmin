import { NativeModules } from 'react-native';


type CalculatorType = {
  add(a: number, b: number): number;
};

const { Calculator } = NativeModules;

export default Calculator as CalculatorType;