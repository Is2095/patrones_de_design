import { GlobalCounter } from './GlobalCounter';

const counter = GlobalCounter.getInstance();

counter.increment();
counter.increment();

console.log('Contador desde módulo A: ', counter.getValue());
