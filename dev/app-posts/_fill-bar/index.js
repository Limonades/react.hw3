import React from 'react';

class FillBar extends React.Component {

    constructor() {
        super();

        this.state = {
            text: '',
            year: '',
            author: '',
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.clearBar = this.clearBar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
    }

    clearBar() {
        this.setState({
            text: '',
            year: '',
            author: '',
            title: ''
        });
    }

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
    }

    render () {
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
}

export default FillBar;
