import React from "react"
import BigCookie from "./BigCookie"
import cookie from "../img/bigCookie.png"
import background from "../img/backgroundBlue.png"
import { ParticleManager } from "../particles"
export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<>
				<div
					style={{
						position: "absolute",
						backgroundImage: `url(${background})`,
						backgroundRepeat: "repeat",
						width: "100%",
						height: "100%",
						// Hahahaha
						zIndex: -9999999999999,
					}}
				/>
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
					<div
						style={{
							gridArea: "title",
							placeSelf: "center",
							// Nice hack 😎
							backgroundColor: "black",
							color: "white",
						}}
					>
						Cookie clicker rewritten! This is a copy of{" "}
						<a href="https://orteil.dashnet.org/cookieclicker">
							cookie clicker
						</a>
						, please play that first!
					</div>
					<br />
					<BigCookie
						src={cookie}
						onClick={() => console.log("Click!")}
						radius={128}
						style={{
							gridArea: "cookie",
							width: "256px",
							height: "256px",
							placeSelf: "center",
						}}
					/>
					<ParticleManager />
				</div>
			</>
		)
	}
}
