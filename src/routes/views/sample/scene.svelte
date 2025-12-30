<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { GLTF, OrbitControls } from '@threlte/extras';
	import { XR } from '@threlte/xr';
	import { FBXLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';

	const fbx = useLoader(FBXLoader).load('/models/jet/scene.fbx');
	const gltf = useLoader(GLTFLoader).load('/models/british-aerospace-146/scene.gltf');
</script>

<XR>
	{#snippet fallback()}
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
			<OrbitControls />
		</T.PerspectiveCamera>
		<GLTF url="/models/british-aerospace-146/scene.gltf" position={[0, 4.3, 0]} />
		<!-- <Grid cellColor="#FE3D00" sectionColor="#FE3D00" /> -->
	{/snippet}

	<GLTF url="/models/british-aerospace-146/scene.gltf" position={[0, 4.3, 0]} />
</XR>
