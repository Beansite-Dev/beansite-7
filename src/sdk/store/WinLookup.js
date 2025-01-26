import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
export const winLookupStore=atom({
  key: 'WindowLookup',
  default:[],
});