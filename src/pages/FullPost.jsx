import { useEffect, useState } from 'react';
import { Post } from '../components';
import { AddComment } from '../components';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import instance from '../axios';
import Markdown from 'react-markdown';

export const FullPost = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		instance
			.get(`/posts/${id}`)
			.then(res => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch(err => {
				console.warn(err);
				alert('Error when receiving post');
			});
	}, []);

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
				imageUrl={data.imageUrl ? `http://localhost:4444/${data.imageUrl}` : null}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={0}
				tags={data.tags}
				isFullPost
			>
				<Markdown>{data.text}</Markdown>
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: 'Вася Пупкин',
							avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
						},
						text: 'Это тестовый комментарий 555555',
					},
					{
						user: {
							fullName: 'Иван Иванов',
							avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
						},
						text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
					},
				]}
				isLoading={false}
			>
				<AddComment />
			</CommentsBlock>
		</>
	);
};
