import React from "react";
import "./Button.css";

export const BtnStyleTypes = {
	"primary": {
		className :"bg-white text-black hover:border hover:border-slate-500 hover:border-solid",
		style: {
		} as React.CSSProperties
	},
	"danger": {
		className: "bg-red-700 text-white",
		style: {}
	},
	"secondary": {
		className: "bg-blue-400 text-white",
		style: {}
	}
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	styleType?: keyof typeof BtnStyleTypes
}
export interface InputProps extends React.InputHTMLAttributes<HTMLButtonElement> {
	styleType?: keyof typeof BtnStyleTypes
}

export const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {className, styleType="primary", style, ...rest } = props;
	const {className: cls, style: cStyle} = BtnStyleTypes[styleType];
	return (
		<button
			className={`px-5 py-2 rounded-sm btn ${cls} ${className}`}
			ref={ref}
			style={{
				...cStyle,
				...style,
			}}
			{...rest}
		>
		</button>
	)
});

export const SubmitButton: React.FC<InputProps> = React.forwardRef<HTMLButtonElement, InputProps>((props, ref) => {
	const {className, styleType="primary", style, ...rest } = props;
	const {className: cls, style: cStyle} = BtnStyleTypes[styleType];
	return (
		<input
			type="submit"
			className={`px-5 py-2 rounded-sm btn ${cls} ${className}`}
			ref={ref}
			style={{
				...cStyle,
				...style,
			}}
			{...rest}
		/>
	)
});
