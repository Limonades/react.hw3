import React from 'react';
import articles from '../_articles';
import PostList from '../_post-list';
import FillBar from '../_fill-bar';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            data: articles,
            cards: articles.slice(0, 2),
            counter: 2
        };

        this.handleClick = this.handleClick.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.createArticle = this.createArticle.bind(this);
    }

    componentWillMount() {
        const data = JSON.parse(localStorage.getItem('data'));

        console.log('забрали с локала' + data);

        // this.setState({ data });

    }

    componentDidUpdate() {
        const data = JSON.stringify(this.state.data);
        console.log('положили в локал' +  data);
        localStorage.setItem('data', data);
    }

    addArticle(card) {
        this.setState({
            cards: [card, ...this.state.cards]
        })
    }

    loadMore(arr, num) {
        if (num >= arr.length) {
            document.querySelector('.btn-wrap').classList.add('hidden')
        } else {
            document.querySelector('.btn-wrap').classList.remove('hidden')
        }
        return  arr.slice(0, num)
    }

    handleClick(e) {
        e.preventDefault();
        const { counter, data } = this.state;
        const step = e.target.tagName.toLowerCase() === 'a' ? counter + 2 : counter;

        this.setState({
            cards: this.loadMore(data, step),
            counter: step
        })
    }

    createArticle(article) {
        console.log(articles);
        articles.unshift(article);

        console.log(articles);
        console.log(this.state);
    }

    render() {
        const { cards } = this.state;
        return (
            <div>
                <PostList cards={cards} handleClick={this.handleClick} />
                <FillBar createArticle={this.createArticle} handleClick={this.handleClick} />
            </div>
        )
    }
}

export default App;