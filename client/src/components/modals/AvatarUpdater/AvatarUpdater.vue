<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const modalProps = computed(() => store.getters.modalProps);

const canvasRef = ref(null);
const context = ref(null);

const image = ref({
	x: 0,
	y: 0,
	resource: null,
	width: 0,
	height: 0,
});

const scale = ref(1);

const borderRadius = 200;
const borderColor = [0, 0, 0, 0.5];
const width = 400;
const height = 400;
const border = 25;
const dimensions = {
	width,
	height,
	border,
	canvas: {
		width: width + 25 * 2,
		height: height + 25 * 2,
	},
};

const rotationRadian = (0 * Math.PI) / 180;

onMounted(() => {
	context.value = canvasRef.value.getContext('2d');
	onPaint();
	loadImage(modalProps.value.photo);
});

watch(scale, () => {
	onRedraw();
});

const onPaint = () => {
	context.value.save();
	context.value.translate(0, 0);
	context.value.fillStyle = 'rgba(' + borderColor.slice(0, 4).join(',') + ')';
	const height = dimensions.canvas.height;
	const width = dimensions.canvas.width;
	context.value.beginPath();

	drawRoundedRect(
		context.value,
		dimensions.border,
		dimensions.border,
		width - dimensions.border * 2,
		height - dimensions.border * 2,
		borderRadius,
	);

	context.value.rect(width, 0, -width, height);
	context.value.fill('evenodd');
	context.value.restore();
};

const onPaintImage = (context, image, border) => {
	var position = calculatePosition(image, border);
	context.save();
	context.globalCompositeOperation = 'destination-over';
	context.translate(dimensions.canvas.width / 2, dimensions.canvas.height / 2);
	context.rotate(rotationRadian);
	context.translate(-dimensions.canvas.width / 2, -dimensions.canvas.height / 2);
	context.drawImage(image, position.x, position.y, position.width, position.height);
	context.restore();
};

const drawRoundedRect = (context, x, y, width, height, borderRadius) => {
	if (borderRadius === 0) {
		context.rect(x, y, width, height);
	} else {
		const widthMinusRad = width - borderRadius;
		const heightMinusRad = height - borderRadius;
		context.translate(x, y);
		context.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5);
		context.lineTo(widthMinusRad, 0);
		context.arc(widthMinusRad, borderRadius, borderRadius, Math.PI * 1.5, Math.PI * 2);
		context.lineTo(width, heightMinusRad);
		context.arc(widthMinusRad, heightMinusRad, borderRadius, Math.PI * 2, Math.PI * 0.5);
		context.lineTo(borderRadius, height);
		context.arc(borderRadius, heightMinusRad, borderRadius, Math.PI * 0.5, Math.PI);
		context.translate(-x, -y);
	}
};

const onRedraw = () => {
	context.value.clearRect(0, 0, dimensions.canvas.width, dimensions.canvas.height);
	onPaint();
	onPaintImage(context.value, image.value.resource, border);
};

const loadImage = (imageURL) => {
	let imageObj = new Image();

	imageObj.onload = () => {
		let imageState = getInitialSize(imageObj.width, imageObj.height);
		image.value.x = 0;
		image.value.y = 0;
		image.value.resource = imageObj;
		image.value.width = imageState.width;
		image.value.height = imageState.height;
		onPaintImage(context.value, imageObj, border);
	};
	imageObj.onerror = (err) => console.log('error loading image: ', err);

	imageObj.src = imageURL;
};

const getInitialSize = (width, height) => {
	let newHeight;
	let newWidth;

	const canvasRatio = dimensions.height / dimensions.width;
	const imageRatio = height / width;

	if (canvasRatio > imageRatio) {
		newHeight = dimensions.height;
		newWidth = width * (newHeight / height);
	} else {
		newWidth = dimensions.width;
		newHeight = height * (newWidth / width);
	}

	return {
		height: newHeight,
		width: newWidth,
	};
};

function transformDataWithRotation(x, y) {
	let radian = rotationRadian;
	let rx = x * Math.cos(radian) - y * Math.sin(radian);
	let ry = x * Math.sin(radian) + y * Math.cos(radian);
	return [rx, ry];
}

const calculatePosition = () => {
	let width = image.value.width * scale.value;
	let height = image.value.height * scale.value;
	var widthDiff = (width - dimensions.width) / 2;
	var heightDiff = (height - dimensions.height) / 2;
	var x = image.value.x * scale.value; // - widthDiff;
	var y = image.value.y * scale.value; // - heightDiff;
	[x, y] = transformDataWithRotation(x, y);
	x += border - widthDiff;
	y += border - heightDiff;
	return {
		x,
		y,
		height,
		width,
	};
};

const state = ref({
	drag: false,
	mx: null,
	my: null,
});

watch(state, () => {
	onRedraw();
}, { deep: true });

const onDragEnd = () => {
	if (state.value.drag) {
		state.value.drag = false;
	}
};

const onDragStart = (e) => {
	e = e || window.event;
	if (e.type !== 'touchstart') {
		e.preventDefault();
	}
	state.value.drag = true;
	state.value.mx = null;
	state.value.my = null;
	let eventSubject = document;
	let hasMoved = false;
	let handleMouseUp = (event) => {
		onDragEnd();
		if (!hasMoved && event.targetTouches) {
			e.target.click();
		}
		eventSubject.removeEventListener('mouseup', handleMouseUp);
		eventSubject.removeEventListener('mousemove', handleMouseMove);
		eventSubject.removeEventListener('touchend', handleMouseUp);
		eventSubject.removeEventListener('touchmove', handleMouseMove);
	};
	let handleMouseMove = (event) => {
		hasMoved = true;
		onMouseMove(event);
	};
	eventSubject.addEventListener('mouseup', handleMouseUp);
	eventSubject.addEventListener('mousemove', handleMouseMove);
	eventSubject.addEventListener('touchend', handleMouseUp);
	eventSubject.addEventListener('touchmove', handleMouseMove);
};

const onMouseMove = (e) => {
	e = e || window.event;
	if (state.value.drag === false) {
		return;
	}


	let imageState = image.value;
	const lastX = imageState.x;
	const lastY = imageState.y;

	const mousePositionX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
	const mousePositionY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;

	const newState = {
		mx: mousePositionX,
		my: mousePositionY,
		image: imageState,
	};

	if (state.value.mx && state.value.my) {
		const xDiff = (state.value.mx - mousePositionX) / scale.value;
		const yDiff = (state.value.my - mousePositionY) / scale.value;

		imageState.y = getBoundedY(lastY - yDiff);
		imageState.x = getBoundedX(lastX - xDiff);
	}

	state.value.mx = newState.mx;
	state.value.my = newState.my;
	image.value = imageState;
};

function getBoundedX(x) {
	let width =
		Math.abs(image.value.width * Math.cos(rotationRadian)) +
		Math.abs(image.value.height * Math.sin(rotationRadian));
	let widthDiff = Math.floor((width - dimensions.width / scale.value) / 2);
	widthDiff = Math.max(0, widthDiff);
	return Math.max(-widthDiff, Math.min(x, widthDiff));
}

function getBoundedY(y) {
	let height =
		Math.abs(image.value.width * Math.sin(rotationRadian)) +
		Math.abs(image.value.height * Math.cos(rotationRadian));
	let heightDiff = Math.floor((height - dimensions.height / scale.value) / 2);
	heightDiff = Math.max(0, heightDiff);
	return Math.max(-heightDiff, Math.min(y, heightDiff));
}


const finishUrl = ref('');

const canvasToImage = () => {

	const { width, height } = dimensions;

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	onPaintImage(ctx, image.value.resource, 0);
	const dataUrl = canvas.toDataURL();
	var link = document.createElement('a');
	link.href = dataUrl;
	link.download = 'canvas_image.png';
	link.click();
};

</script>

<template>
	<div class="avatar-updater">
		<h2 class="avatar-updater__title">Drag the position</h2>
		<canvas
			class="avatar-updater__canvas"
			ref="canvasRef"
			:width="dimensions.canvas.width"
			:height="dimensions.canvas.height"
			@mousedown="onDragStart"
			@touchstart="onDragStart"
		>
		</canvas>

		<button @click="canvasToImage">save</button>

		<pre>{{finishUrl}}</pre>
		<img :src="finishUrl" />

		<input type="range" v-model="scale" min="1" max="3" step="0.02" />
	</div>
</template>

<style lang="scss" scoped>
	@import './AvatarUpdater.scss';
</style>
