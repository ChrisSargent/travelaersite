import React, {Component} from 'react';
import ArticleHeader from '../article-header';
import Close from '../close';
import Icon from '../icons';

import * as CommentsActions from '../../actions/CommentsActions';
import CommentsStore from '../../stores/CommentsStore';

require('./_comment-form.sass');

class CommentLoader extends Component {
  constructor() {
    super();
    this.setShowLoader = this.setShowLoader.bind(this);
    this.state = {
      loaderClass: 'loader -submit'
    };
  }

  componentWillMount() {
    // Add listeners for changes to loading state
    CommentsStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    // Remove listeners for changes to loading state
    CommentsStore.removeListener('change', this.setShowLoader);
  }

  setShowLoader() {
    var getLoading = CommentsStore.getLoading();
    var self = this;

    if(getLoading) {
      this.setState({loaderClass: 'loader -submit -loading'});
    } else {
      setTimeout(function () {
        self.setState({loaderClass: 'loader -submit'});
      }, 1000);
    }
  }

  render() {
    const {loaderClass} = this.state;

    return (
      <div className={loaderClass}>
        <Icon type="spinner" title="Loading..." />
      </div>
    );
  }
}

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetForm: false
    }
    this.processComment = this.processComment.bind(this);
    this.resetForm = this.resetForm.bind(this);
  };

  componentWillMount() {
    CommentsStore.on('change', this.resetForm);
  }

  componentWillUnmount() {
    CommentsStore.removeListener('change', this.resetForm);
  }

  resetForm() {
    // Only resets the form if the submission was successful
    CommentsStore.getResetForm() && this.refs.commentForm.reset();
  }

  processComment(e) {
    var commentData;
    e.preventDefault();

    commentData = '?'
    commentData += 'author_name=' + encodeURIComponent(this.refs.name.value) +
      '&author_email=' + encodeURIComponent(this.refs.email.value) +
      '&content=' + encodeURIComponent(this.refs.comment.value) +
      '&parent=' + encodeURIComponent((this.props.parent || '0')) +
      '&post=' + encodeURIComponent(this.props.post);

    CommentsActions.addComment(commentData);
  }

  render() {
    const {close} = this.props;

    return (
      <section className="submit-section">
        {close && <Close close={close} />}
        <ArticleHeader title="Leave a Comment" subtitle="Your email address will not be published" />
        <form className="form-comment" ref="commentForm" onSubmit={this.processComment} >
          <span className="name"><input type="text" ref="name" placeholder="Name" /></span>
          <span className="email"><input type="email" ref="email" placeholder="Email" /></span>
          <span className="comment"><textarea ref="comment" placeholder="Your comment" /></span>
          <span className="submit"><button id="submit" type="submit" className="btn -cta">Submit</button></span>
        </form>
        <CommentLoader />
      </section>
    )
  }
}
