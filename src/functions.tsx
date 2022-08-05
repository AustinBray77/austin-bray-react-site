export const delay = (ms: number): Promise<void> =>
	new Promise((res) => setTimeout(res, ms));
export const dist = (a: number[], b: number[]): number =>
	Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

export function create2DArr<T>(cols: number, rows: number, base: T): T[][] {
	let output: T[][] = [];

	for (let i: number = 0; i < cols; i++) {
		let row: T[] = [];

		for (let j: number = 0; j < rows; j++) {
			row.push(base);
		}

		output.push(row);
	}

	return output;
}

const audioContext = new window.AudioContext();

export function playFreq(frequency: number, duration: number) {
	let oscillator: OscillatorNode = new OscillatorNode(audioContext);

	oscillator.type = "square";
	oscillator.frequency.value = frequency;
	oscillator.connect(audioContext.destination);
	oscillator.start();
	oscillator.stop(duration);
}
