// vuex.d.ts
import { Store } from 'vuex';

declare module 'vuex' {
	// declare your own store states

	export function useStore<T = unknown>(): Store<T>;

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
