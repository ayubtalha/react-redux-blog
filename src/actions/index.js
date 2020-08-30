import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  console.log(getState().posts);
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));

  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach((id) => dispatch(fetchUser(id)))
  //   .value();
};

export const fetchPosts = () => {
  return async function (dispatch) {
    const response = await jsonPlaceHolder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get("/users/" + id); //(`/users/${id}`)
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// export const fetchUser = (id) => async (dispatch) => {
//   _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get("/users/" + id); //(`/users/${id}`)

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// export const fetchPosts = async () => {
//     const response = await jsonPlaceHolder.get("/posts");
//     return {
//       type: "FETCH_POSTS",
//       payload: response,
//     };
//   };
