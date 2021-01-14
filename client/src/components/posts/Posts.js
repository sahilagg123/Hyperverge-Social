import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return loading ? (
    <h4> Loading... </h4>
  ) : (
      
    <Fragment>
    <PostForm ></PostForm>
      <h1 className='large text-primary'> Posts </h1>
      <p className='lead'>
        <i className='fas fa-user'> My Posts yeahhh</i>
      </p>
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post}></PostItem>
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
