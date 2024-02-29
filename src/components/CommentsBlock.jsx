import React from 'react';
import { SideBlock } from './SideBlock/SideBlock.jsx';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

export const CommentsBlock = ({ comments, children, isLoading }) => {
	console.log(comments);
	return (
		<SideBlock title='Комментарии'>
			<List>
				{comments.items.map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton
										variant='circular'
										width={40}
										height={40}
									/>
								) : (
									<Avatar
										alt={obj.user.fullName}
										src={obj.user.avatarUrl}
									/>
								)}
							</ListItemAvatar>
							<ListItemText
								primary={
									isLoading ? (
										<Skeleton
											variant='text'
											height={25}
											width={120}
										/>
									) : (
										obj.user.fullName
									)
								}
								secondary={
									isLoading ? (
										<Skeleton
											variant='text'
											height={18}
											width={230}
										/>
									) : (
										obj.text
									)
								}
							/>
						</ListItem>
						<Divider
							variant='inset'
							component='li'
						/>
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
