import React from 'react'

class Post extends React.Component {
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
}

export default Post;