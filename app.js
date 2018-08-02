const articles = [{
        id: 'post-1',
        year: 2014,
        author: 'Christopher Nolan',
        title: 'Interstellar',
        text: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    }, {
        id: 'post-2',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-3',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-4',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-5',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-6',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-7',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-8',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }, {
        id: 'post-9',
        year: 1997,
        author: 'David Fincher',
        title: 'The Game',
        text: 'After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.'
    }
];

const Post = React.createClass({
    render() {
        const { title, author, text, year, addedClass } = this.props;
        return (
            <article className={addedClass}>
                <h2 className='title'>{title}</h2>
                <h3 className='author'>from {author}, {year}</h3>
                <p>{text}</p>
            </article>
        )
    }
});

const PostList = React.createClass({

    render() {
        const { cards, handleClick } = this.props;
        return (
            <section>
                {cards.map(post => (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        text={post.text}
                        year={post.year}
                        addedClass={post.addedClass}
                    />
                ))}
                <div className='btn-wrap'>
                    <a onClick={handleClick} href='#' className='btn'>
                        Load more
                    </a>
                </div>
            </section>
        )
    }
});

const FillBar = React.createClass({
    getInitialState() {
        return {
            text: '',
            year: '',
            author: '',
            title: ''
        }
    },

    handleChange(e) {
        const { name, value } = e.target;
        if (name === 'title') {
            this.setState({
                title: value
            })
        }

        if (name === 'year') {
            this.setState({
                year: value
            })
        }

        if (name === 'author') {
            this.setState({
                author: value
            })
        }

        if (name === 'text') {
            this.setState({
                text: value
            })
        }
    },

    clearBar() {
        this.setState({
            text: '',
            year: '',
            author: '',
            title: ''
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        const { createArticle } = this.props;

        const newArticle = {
            id: Date.now(),
            year: this.state.year,
            author: this.state.author,
            title: this.state.title,
            text: this.state.text,
            addedClass: 'user-post'
        };

        console.log(newArticle);

        createArticle(newArticle);

        this.props.handleClick(e);

        this.clearBar();
    },

    render: function () {
        const {title, author, text, year} = this.state;
        return (
            <aside className='sidebar'>
                <form className='sidebar__form' onSubmit={this.handleSubmit}>
                    <label>
                        Movie title
                        <input
                            onChange={this.handleChange}
                            className='name-field'
                            value={title}
                            name='title'
                            required
                        />
                    </label>
                    <label>
                        Director
                        <input
                            onChange={this.handleChange}
                            className='author-field'
                            value={author}
                            name='author'
                            required
                        />
                    </label>
                    <label>
                        Year
                        <input
                            onChange={this.handleChange}
                            className='year-field'
                            value={year}
                            name='year'
                            /*type="number"
                            min='1900' max='2018'*/
                            required/>
                    </label>
                    <label>
                        Short Desription
                        <textarea
                            onChange={this.handleChange}
                            className='text-field'
                            value={text}
                            name='text'
                            required
                        />
                    </label>
                    <button className='form-btn'>
                        save
                    </button>
                </form>
            </aside>
        )
    }
});

const App = React.createClass({

    getInitialState() {
        return {
            data: articles,
            cards: articles.slice(0, 2),
            counter: 2
        }
    },

    componentWillMount() {
        const data = JSON.parse(localStorage.getItem('data'));

        console.log('забрали с локала' + data);

        // this.setState({ data });

    },

    componentDidUpdate() {
        const data = JSON.stringify(this.state.data);
        console.log('положили в локал' +  data);
        localStorage.setItem('data', data);
    },

    addArticle(card) {
        this.setState({
            cards: [card, ...this.state.cards]
        })
    },

    loadMore(arr, num) {
        if (num >= arr.length) {
            document.querySelector('.btn-wrap').classList.add('hidden')
        } else {
            document.querySelector('.btn-wrap').classList.remove('hidden')
        }
        return  arr.slice(0, num)
    },

    handleClick(e) {
        e.preventDefault();
        const { counter, data } = this.state;
        const step = e.target.tagName.toLowerCase() === 'a' ? counter + 2 : counter;

        this.setState({
            cards: this.loadMore(data, step),
            counter: step
        })
    },

    createArticle(article) {
        console.log(articles);
        articles.unshift(article);

        console.log(articles);
        console.log(this.state);
    },

    render() {
        const { cards } = this.state;
        return (
            <div>
                <PostList cards={cards} handleClick={this.handleClick} />
                <FillBar createArticle={this.createArticle} handleClick={this.handleClick} />
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

