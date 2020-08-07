import { useState, useMemo, useEffect, RefObject } from "react";

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

export function useDebounce<T>(value: T, delay = 300) {
	const [debounceValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = window.setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			window.clearTimeout(handler);
		};
	}, [value, delay]);
	return debounceValue;
}
export function useThrottle<T>(value: T, delay = 300) {
	const [throttleValue, setThrottledValue] = useState(value);
	const flag = useMemo(() => {
		return { s: true };
	}, []);
	useEffect(() => {
		let handler: number;
		if (flag.s) {
			flag.s = false;
			setThrottledValue(value);
			handler = window.setTimeout(() => {
				flag.s = true;
			}, delay);
		}
		return () => {
			window.clearTimeout(handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, delay]);
	return throttleValue;
}
export function throttle(fn: Function, delay: number = 300) {
	let flag = true;
	return function(...args: any) {
		if (flag) {
			flag = false;
			fn(...args);
			setTimeout(() => {
				flag = true;
			}, delay);
		}
	};
}

export function useClickOutside(
	ref: RefObject<HTMLElement>,
	handler: Function
) {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};
		window.addEventListener("click", listener);
		return () => window.removeEventListener("click", listener);
	}, [ref, handler]);
}
