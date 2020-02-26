import React, { Component } from 'react';
import './demo.scss';
import '../lib/style';
import Zoom from '../lib';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Zoom className="demo-zoom">
					{({ options, onZoomStep, onZoomTo, onPositionTo, onReset }) => (
						<React.Fragment>
							<div className="options-info">{JSON.stringify(options)}</div>
							<div className="tools">
								<button onClick={() => onZoomStep(8)}>onZoomStep - out</button>
								<button onClick={() => onZoomStep(-8)}>onZoomStep - in</button>
								<button onClick={() => {
									const randomValue = -10 + Math.ceil(Math.random() * 20);
									onZoomTo(options.scale + randomValue);
								}}>onZoomTo-随机缩放</button>
								<button onClick={() => {
									const randomValue = -20 + Math.ceil(Math.random() * 40);
									onPositionTo({
										x: options.position.x + randomValue,
										y: options.position.y + randomValue,
									});
								}}>onPositionTo-随机移动</button>
								<button onClick={() => {
									onReset();
								}}>onReset</button>
							</div>
							<Zoom.Content className="content">
								<div className="wrap">
									<div>1</div>
									<div>2</div>
									<div>3</div>
									<div>4</div>
									<div>5</div>
									<div>6</div>
									<div>7</div>
									<div>8</div>
									<div>9</div>
								</div>
							</Zoom.Content>
						</React.Fragment>
					)}
				</Zoom>
			</div>
		);
	}
}