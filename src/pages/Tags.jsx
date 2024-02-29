import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchByTag, fetchTags } from '../redux/slices/posts.js';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const Tags = () => {
	const { tag } = useParams();

	const dispatch = useDispatch();
	const { posts, tags } = useSelector(state => state.posts);
	const userData = useSelector(state => state.auth.data);

	const isPostsLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';

	useEffect(() => {
		dispatch(fetchByTag(tag));
		dispatch(fetchTags());
	}, [tag]);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label='basic tabs example'
			>
				<Tab label={`Посты по тэгу: ${tag}`} />
			</Tabs>
			<Grid
				container
				spacing={4}
			>
				<Grid
					xs={8}
					item
				>
					{isPostsLoading
						? [...Array(5)].map((_, index) => (
								<Post
									isLoading={isPostsLoading}
									key={`loading-${index}`}
								/>
						  ))
						: posts.items.map(obj => (
								<Post
									key={obj._id}
									_id={obj._id}
									title={obj.title}
									imageUrl={obj.imageUrl ? `${import.meta.env.REACT_APP_API_URL}${obj.imageUrl}` : null}
									user={obj.user}
									createdAt={obj.createdAt}
									viewsCount={obj.viewedBy.length}
									commentsCount={0}
									tags={obj.tags}
									isEditable={userData?._id === obj.user?._id}
								/>
						  ))}
				</Grid>
				<Grid
					xs={4}
					item
				>
					<TagsBlock
						items={tags.items}
						isLoading={isTagsLoading}
					/>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Вася Пупкин',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Это тестовый комментарий',
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
					/>
				</Grid>
			</Grid>
		</>
	);
};
