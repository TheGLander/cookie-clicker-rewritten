import React from "react"
import BigCookie from "./BigCookie"
import cookie from "../img/bigCookie.png"
export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<div
				style={{
					display: "grid",
					justifyItems: "center",
					gridTemplateColumns: "30% auto 20%",
					gridTemplateRows: "5% 15% 70% 10%",
					height: "100%",
					gridTemplateAreas: `'title title title'
															'cookie ticker store'
															'cookie art store'
															'. art store'`,
				}}
			>
				<h1 style={{ gridArea: "title" }}>Cookie clicker rewritten!</h1>
				<br />
				<BigCookie
					src={cookie}
					onClick={() => console.log("Click!")}
					style={{
						gridArea: "cookie",
						width: "256px",
						height: "256px",
						placeSelf: "center",
					}}
				/>
			</div>
		)
	}
}
