import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

import { getDiscussion } from './actions';

import Discussion from 'Components/SingleDiscussion/Discussion';
import ReplyBox from 'Components/SingleDiscussion/ReplyBox';
import Opinion from 'Components/SingleDiscussion/Opinion';

import styles from './styles.css';
import appLayout from 'SharedStyles/appLayout.css';

class SingleDiscussion extends Component {
  componentDidMount() {
    const {
      forum,
      discussion,
    } = this.props.params;

    this.props.getDiscussion(discussion);
  }

  render() {
    const {
      fetchingDiscussion,
      discussion,
    } = this.props;

    // return loading status if discussion is not fetched yet
    if (fetchingDiscussion) {
      return <div className={styles.loadingWrapper}>Loading discussion ...</div>;
    }

    const {
      content,
      date,
      favorite_count,
      title,
      tags,
      opinions,
    } = discussion;

    const {
      avatarUrl,
      name,
      username,
    } = discussion.user;

    return (
      <div className={appLayout.constraintWidth}>
        <Discussion
          userAvatar={avatarUrl}
          userName={name}
          userGitHandler={username}
          discTitle={title}
          discDate={moment(date)}
          discContent={content}
          tags={tags}
          favoriteCount={favorite_count}
        />
        <ReplyBox />
        { opinions && opinions.map((opinion) => {
          return (
            <Opinion
              key={opinion._id}
              userAvatar={opinion.user.avatarUrl}
              userName={opinion.user.name}
              userGitHandler={opinion.user.username}
              opDate={moment(opinion.date)}
              opContent={opinion.content}
            />
          );
        }) }
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    fetchingDiscussion: state.discussion.fetchingDiscussion,
    discussion: state.discussion.discussion,
  }; },
  (dispatch) => { return {
    getDiscussion: (discussionSlug) => { dispatch(getDiscussion(discussionSlug)); },
  }; }
)(SingleDiscussion);