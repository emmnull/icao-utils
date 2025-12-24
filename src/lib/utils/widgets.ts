import type { Component } from 'svelte';
import z from 'zod';

export const schema = z.object({
	default: z.custom<Component>(),
	metadata: z.object({
		name: z.string(),
		description: z.string()
		// icon: z.custom<Component>()
	})
});

const modules = import.meta.glob<App.MarkdownModule>('/src/lib/widgets/*.md', {
	base: '/src/lib/widgets'
});

export async function getWidgets() {
	const widgets: Record<string, z.infer<typeof schema>['metadata']> = {};
	for await (const [path, module] of Object.entries(modules)) {
		const param = path.split('/').pop()?.split('.')[0];
		if (!param) continue;
		try {
			widgets[param] = schema.parse(await module()).metadata;
		} catch (error) {
			console.error(error);
		}
	}
	return widgets;
}

export async function getWidget(widget: string) {
	return schema.parse(await modules[`./${widget}.md`]());
}
