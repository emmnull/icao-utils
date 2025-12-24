import { getWidgets } from '$lib/utils/widgets.js';

export async function load() {
	return {
		widgets: await getWidgets()
	};
}
