import { page } from '$app/state';
import type { ResolvedPathname } from '$app/types';
import type { HTMLAnchorAttributes } from 'svelte/elements';

export function getLinkAttributes<T extends ResolvedPathname>(
	href: T,
	{
		currentOnSubpath = false,
		currentOmitHash = true
	}: {
		currentOnSubpath?: boolean;
		currentOmitHash?: boolean;
	} = {}
) {
	const current = $derived.by(() => {
		if (href.startsWith('#') && decodeURIComponent(page.url.hash) === decodeURIComponent(href)) {
			return 'step' as const;
		}
		const pathWithHash = `${page.url.pathname}${page.url.hash}`;
		if ((currentOmitHash && page.url.pathname === href.split('#')[0]) || pathWithHash === href) {
			return 'page' as const;
		}
		if ((currentOnSubpath && pathWithHash.startsWith(href)) || pathWithHash === href) {
			return 'page' as const;
		}
	});

	return {
		href,
		get 'aria-current'() {
			return current;
		}
	} satisfies HTMLAnchorAttributes;
}
