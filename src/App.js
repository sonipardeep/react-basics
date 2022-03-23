import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

var url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY;

const list = [
{
	title: 'React',
	url: 'https://facebook.github.io/react/',
	author: 'Jordan Walke',
	num_comments: 3,
	points: 4,
	objectID: 0,
},
{
	title: 'Redux',
	url: 'https://github.com/reactjs/redux',
	author: 'Dan Abramov, Andrew Clar3k',
	num_comments: 2,
	points: 5,
	objectID: 1,
},
];

function isSearched(searchTerm) {
	return function(item) {
		return item.title.toLowerCase().includes(searchTerm.toLowerCase());
	}
}


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
		result: null,
		searchTerm: DEFAULT_QUERY,
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchTopStories = this.setSearchTopStories.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	setSearchTopStories(result) {
	this.setState({ result });
	}

	onDismiss(id) {
		const isNotId = item => item.objectID !== id;
		const updatedList = this.state.list.filter(isNotId);
		this.setState({ list: updatedList });
	}

	componentDidMount() {
	const { searchTerm } = this.state;
	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
	.then(response => response.json())
	.then(result => this.setSearchTopStories(result))
	.catch(error => error);
	}


	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

/*
option-1
onDismiss(id) {
const updatedList = this.state.list.filter(function isNotId(item) {
return item.objectID !== id;
});
}

option-2

onDismiss(id) {
function isNotId(item) {
return item.objectID !== id;
}
const updatedList = this.state.list.filter(isNotId);
}

option-3
onDismiss(id) {
const updatedList = this.state.list.filter(item => item.objectID !== id);
}


*/



// isNotID returns all items ids which are not clicked...
// filter functions gives all items except the clicked



render() {
	const { searchTerm, result } = this.state;
	if (!result) { return null; }
	return (

		<div className="page">
		<div className="interactions">
		<Search
value={searchTerm}
onChange={this.onSearchChange}
>
Search:
</Search>
</div>
		<Table
		list={result.hits}
		pattern={searchTerm}
		onDismiss={this.onDismiss}
		/>


		</div>

		);
	}
}
export default App;



const Search = ({ value, onChange, children }) =>
<form>
{children} <input
type="text"
value={value}
onChange={onChange}
/>
</form>

const largeColumn = {
width: '40%',
};
class Table extends Component {
	render() {
		const { list, pattern, onDismiss } = this.props;
		return (
		<div className="table">
		{list.filter(isSearched(pattern)).map(item =>
			<div key={item.objectID} className="table-row">
			<span style={{ width: '40%' }}>
			<a href={item.url}>{item.title}</a>
			</span>
			<span style={{ width: '30%' }}>{item.author}</span>
			<span style={{ width: '10%' }}>{item.num_comments}</span>
			<span style={{ width: '10%' }}>{item.points}</span>
			<span style={{ width: '10%' }}>
		<Button onClick={() => onDismiss(item.objectID)} className="button-inline">
Dismiss
</Button>
			</span>
			</div>
			)}
			</div>
			);
		}
	}




	class Button extends Component {
render() {
const {
onClick,
className='',
children,
} = this.props;
return (
<button
onClick={onClick}
className={className}
type="button"
>
{children}
</button>
);
}
}