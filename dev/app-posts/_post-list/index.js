import React from 'react';
import Post from './../_post'

class PostList extends React.Component {

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
}

export default PostList;