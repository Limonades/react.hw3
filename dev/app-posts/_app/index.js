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
            counter: 2,
            isHasMore: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.createArticle = this.createArticle.bind(this);
    }

    componentDidMount() {
        const localData = JSON.parse(localStorage.getItem('localData'));

        if (localData) {
            this.setState({ data: localData, cards: localData.slice(0, 2) });
        }
    }

    componentDidUpdate() {
        const data = JSON.stringify(this.state.data);
        const localData = [];

        if (data.length !== localData.length) {
            localStorage.setItem('localData', localData.concat(data));
        }
    }

    checkArticlesCount() {
        const { data, counter } = this.state;

        counter >= data.length
            ? this.setState({isHasMore: false})
            : this.setState({isHasMore: true});
    }

    loadMore(arr, num) {

        this.checkArticlesCount();

        return  arr.slice(0, num)
    }

    handleClick(e) {
        e.preventDefault();
        const { counter, data } = this.state;
        const step = counter + 2;

        this.setState({
            cards: this.loadMore(data, step),
            counter: step
        });

        this.checkArticlesCount();
    }

    createArticle(article) {
        const newLocalArticles = this.state.data;
        newLocalArticles.unshift(article);

        this.setState({
            data: newLocalArticles,
            cards: newLocalArticles.slice(0, this.state.counter)
        })
    }

    render() {
        const { cards } = this.state;
        return (
            <div>
                <PostList cards={cards} handleClick={this.handleClick} />
                <FillBar createArticle={this.createArticle} />
            </div>
        )
    }
}

export default App;