export interface ModalState {
	isOpen: boolean;
	name: string;
	props: any | null;
}

export interface OpenModalPayload {
	name: string;
	props: any;
}

export interface ModalInject {
	open(payload: OpenModalPayload): void;
	close(): void;
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$modal: {
			open({ name, props }: OpenModalPayload): void;
			close(): void;
		};
	}
}
