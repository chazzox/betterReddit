import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Listing from '../components/listing';

import '../styles/subredditSidebar.scss';

class Subreddit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			subInfo: {},
			sideBar: {}
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) this.getSubredditInfo();
	}

	componentDidMount() {
		this.getSubredditInfo();
	}

	getSubredditInfo() {
		fetch('https://oauth.reddit.com' + this.props.location.pathname + '/about', {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				this.setState({ subInfo: json.data });
			})
			.catch((error) => console.log('error', error));
	}

	getBannerUrl(url) {
		if (url === undefined) return '';
		else return url.split('?')[0];
	}

	render() {
		return (
			<>
				{_.isEmpty(this.state.subInfo) ? null : (
					<div id="subredditSidebar">
						<div
							id="headerImage"
							style={{
								backgroundImage: `url(${this.getBannerUrl(this.state.subInfo.banner_background_image)})`
							}}
						></div>
						<div id="subredditIcon" style={{ backgroundImage: `url(${this.state.subInfo.icon_img})` }}></div>
						<h1>{this.state.subInfo.display_name}</h1>
						<p>{this.state.subInfo.public_description}</p>
						<div
							style={{ overflow: 'auto' }}
							dangerouslySetInnerHTML={{
								__html: new DOMParser().parseFromString(this.state.subInfo.description_html, 'text/html')
									.documentElement.textContent
							}}
						/>
						<p>
							accounts online: {this.state.subInfo.accounts_active} | total members:{' '}
							{this.state.subInfo.subscribers}
						</p>
					</div>
				)}
				<div id="contentContainer">
					<Listing path={this.props.location.pathname} />
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Subreddit);
