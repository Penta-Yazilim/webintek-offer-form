interface ValidateInputs {
	[key: number]: Array<string>;
}

export default interface Steps {
	value: number;
	items: Array<object>;
	errors: Array<Array<string>>;
	apiURL: string;
	validateInputs: ValidateInputs;
	setErrors: (errors: Array<Array<string>> | any) => void;
	onRemove: null | ((index: number) => void);
	onAdd: null | ((index: number) => void);
	addStep: (title: string, toIndex: number) => number;
	removeStep: (index: number) => void;
	onRemoveStep: (cbx: (index: number) => void) => void;
	onAddStep: (cbx: (index: number) => void) => void;
	nextStep: () => void;
	prevStep: () => void;
	go(step: number): void;
}