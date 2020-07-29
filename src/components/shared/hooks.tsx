import { useState, useMemo } from "react";

export function useStopScroll(state: boolean, delay: number, open?: boolean) {
	if (open) {
		let width = window.innerWidth - document.body.clientWidth;
		if (state) {
			document.body.style.overflow = "hidden";
			document.body.style.width = `calc(100% - ${width}px)`;
		} else {
			//等动画渲染
			setTimeout(() => {
				document.body.style.overflow = "auto";
				document.body.style.width = `100%`;
			}, delay);
		}
	}
}

export function useStateAnimation(
	parentSetState: (v: boolean) => void,
	delay: number = 300
): [boolean, (v: boolean) => void, () => void] {
	const [state, setState] = useState(true);
	const [innerClose, unmount] = useMemo(() => {
		let timer: number;
		let innerclose = (v: boolean) => {
			setState(v);
			timer = window.setTimeout(() => {
				parentSetState(v);
				setState(true);
			}, delay);
		};
		let unmount = () => window.clearTimeout(timer);
		return [innerclose, unmount];
	}, [setState, parentSetState, delay]);
	return [state, innerClose, unmount];
}
