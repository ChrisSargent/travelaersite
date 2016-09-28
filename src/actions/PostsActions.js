import dispatcher from "../dispatcher";

import axios from "axios";

export function fetchPosts() {
    dispatcher.dispatch({type: "FETCH_POSTS"});
    axios.get("http://travelaersite.dev/wordpress/wp-json/wp/v2/posts", {
        params: {
            // ID: 12345
        }
    }).then(function(response) {
      setTimeout(function () {
        // Just using to a timeout to simulate a delay
        // console.log(response);
        dispatcher.dispatch({type: "RECEIVE_POSTS", posts: response.data});
      }, 1000);
    }).catch(function(error) {
        // console.log(error);
    });
}
