import React, {Component} from 'react';
import css from '../../lib/css';

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
      loadingClass: ''
    };
  }

  componentWillMount() {
    CommentsStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    CommentsStore.removeListener('change', this.setShowLoader);
  }

  setShowLoader() {
    var self = this;
    const getLoading = CommentsStore.getLoading();

    if(getLoading) {
      this.setState({loadingClass: css.loading});
    } else {
      setTimeout(function () {
        self.setState({loadingClass: ''});
      }, 1000);
    }
  }

  render() {
    const {loadingClass} = this.state;

    return (
      <div className={css.loader + loadingClass + ' -submit'}>
        <Icon type="spinner" />
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
    const {closeClick} = this.props;
    const compName = 'submit';

    return (
      <section className={css.section + compName}>
        {closeClick && <Close closeClick={closeClick} />}
        <ArticleHeader title="Leave a Comment" subtitle="Your email address will not be published" />
        <form className={css.form + compName} ref="commentForm" onSubmit={this.processComment} >
          <span className="name"><input type="text" ref="name" placeholder="Name" /></span>
          <span className="email"><input type="email" ref="email" placeholder="Email" /></span>
          <span className="comment"><textarea ref="comment" placeholder="Your comment" /></span>
          <span className="submit"><button id="submit" type="submit" className={css.btn + ' -cta'}>Submit</button></span>
        </form>
        <CommentLoader />
      </section>
    )
  }
}
