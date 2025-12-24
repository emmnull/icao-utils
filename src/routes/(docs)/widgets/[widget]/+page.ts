import { getWidget } from '$lib/utils/widgets.js';

export async function load(e) {
	return {
		widget: await getWidget(e.params.widget)
	};
}
