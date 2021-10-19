import { DependencyList, EffectCallback } from 'react';
/**
 * Exactly like React's `useEffect`, but skips initial render. Tries to
 * reproduce `componentDidUpdate` behavior.
 *
 * @see https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render/53180013#53180013
 */
export declare function useDidUpdateEffect(fn: EffectCallback, inputs?: DependencyList): void;
//# sourceMappingURL=useDidUpdateEffect.d.ts.map