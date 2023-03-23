export default interface Steps {
	value: number;
	stepsCount: number;
	addStep: () => void;
	getRecentStep: () => number;
	nextStep: () => void;
	prevStep: () => void;
}