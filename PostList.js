import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./PostSlice";
import React from "react";

export default function PostList() {
    const dispatch = useDispatch();
    const postList = useSelector(({ posts: { postList } }) => postList);

    useEffect(() => {
        dispatch(fetchPosts()) 
    }, [dispatch]);

    return (
        <>
            {postList.map(post => (
                <div style={{ margin: 20 }} key={post.id}>
                    {post.body}
                </div>
                
            ))}
        </>
    )

}