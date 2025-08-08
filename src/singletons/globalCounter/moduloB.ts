import { GlobalCounter } from './GlobalCounter';

const counter = GlobalCounter.getInstance();

counter.increment();
console.log('Contador desde módulo B: ', counter.getValue());
