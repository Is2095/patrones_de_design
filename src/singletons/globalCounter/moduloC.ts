import { GlobalCounter } from './GlobalCounter';

const counter = GlobalCounter.getInstance();

counter.reset();
console.log('Contador reseteado: ', counter.getValue());
