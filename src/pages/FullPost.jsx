import { useEffect, useState } from 'react';
import { Post } from '../components';
import { AddComment } from '../components';
import { CommentsBlock } from '../components/CommentsBlock';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../axios';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/comments';

export const FullPost = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { id } = useParams();
	const comments = useSelector(state => state.comments.comments);
	const userId = useSelector(state => state.auth.data?._id);
	const token = window.localStorage.getItem('token');

	const isCommentLoading = comments.status === 'loading';

	useEffect(() => {
		if (userId !== undefined) {
			instance
				.get(`/posts/${id}?viewed=${userId}`)
				.then(res => {
					setData(res.data);
					setIsLoading(false);
				})
				.catch(err => {
					console.warn(err);
					alert('Error when receiving post');
				});
		}
	}, [userId]);

	useEffect(() => {
		dispatch(fetchComments(id));
	}, [id]);

	if (!token) {
		alert('You must be logged in to view posts.');
		navigate('/');
	}

	if (isLoading) {
		return (
			<Post
				isLoading={isLoading}
				isFullPost
			/>
		);
	}

	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : null}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewedBy.length}
				commentsCount={0}
				tags={data.tags}
				isFullPost
			>
				<Markdown>{data.text}</Markdown>
			</Post>
			<CommentsBlock
				comments={comments}
				isLoading={isCommentLoading}
			>
				<AddComment />
			</CommentsBlock>
		</>
	);
};
