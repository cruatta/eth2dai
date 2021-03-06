import { from, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as Web3 from 'web3';

export let web3 : Web3;

export type Web3Status = 'ready' | 'readonly' | 'missing' | 'initializing';

export interface Web3Window {
  web3?: any;
  ethereum?: any;
}

export const web3Status$: Observable<Web3Status> = from(['initializing']).pipe(
  map(() => {
    const win = window as Web3Window;
    if (win.web3) {
      web3 = new Web3(win.web3.currentProvider);
      return 'ready';
    }
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
    return 'readonly';
  }),
  shareReplay(1),
);
web3Status$.subscribe();

export function setupFakeWeb3ForTesting() {
  web3 = new Web3();
}
