import React, {Component} from 'react';
import css from '../../lib/css';

import Actions from '../actions';
import ArticleHeader from '../article-header';
import Message from '../message';
import SVG from '../svg';

import * as CommentsActions from '../../actions/CommentsActions';
import SubmitStore from '../../stores/SubmitStore';

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
    SubmitStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    SubmitStore.removeListener('change', this.setShowLoader);
  }

  setShowLoader() {
    const getLoading = SubmitStore.getLoading();

    if(getLoading) {
      this.setState({loadingClass: css.loading});
    } else {
      this.setState({loadingClass: ''});
    }
  }

  render() {
    const {loadingClass} = this.state;

    return (
      <div className={css.loader + loadingClass + ' -submit'}>
        <SVG type="spinner" />
      </div>
    );
  }
}

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageObj: false,
    }
    this.processComment = this.processComment.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  };

  componentWillMount() {
    SubmitStore.on('change', this.handleUpdate);
  }

  componentWillUnmount() {
    SubmitStore.removeListener('change', this.handleUpdate);
  }

  handleUpdate() {
    // Resets the form if the submission was successful
    SubmitStore.shouldResetForm() && this.refs.commentForm.reset();
    const messageObj = SubmitStore.getMessageObj();
    this.setState({messageObj});
  }

  processComment(ev) {
    var commentData;
    ev.preventDefault();

    commentData = '?'
    commentData += 'author_name=' + encodeURIComponent(this.refs.name.value) +
      '&author_email=' + encodeURIComponent(this.refs.email.value) +
      '&content=' + encodeURIComponent(this.refs.comment.value) +
      '&parent=' + encodeURIComponent((this.props.parentCommentID || '0')) +
      '&post=' + encodeURIComponent(this.props.postID);

    CommentsActions.addComment(commentData);
  }

  render() {
    const compName = 'submit';
    const {messageObj} = this.state;

    const submitActions = [
      {
        modifier: 'cta',
        linkTitle: 'Submit',
        submit: true
      },
      {
        modifier: 'reset',
        linkTitle: 'Cancel',
        param: 'close',
      }
    ]

    return (
      <section className={css.block + compName}>
        <ArticleHeader title="Leave a Comment" subtitle="Your email address will not be published" modifier={compName}/>
        {messageObj && <Message messageObj={messageObj} />}
        <form className={css.form + compName} ref="commentForm" onSubmit={this.processComment} >
          <span className="name"><input type="text" ref="name" placeholder="Name" value="Chris"/></span>
          <span className="email"><input type="email" ref="email" placeholder="Email" value="chris@stickypixel.com"/></span>
          <span className="comment"><textarea ref="comment" placeholder="Your Comment"/></span>
          <Actions actions={submitActions} />
        </form>
        <CommentLoader />
      </section>
    )
  }
}
