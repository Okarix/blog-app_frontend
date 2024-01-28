import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

export const SideComments = ({ items }) => {
	return (
		<List>
			{items.map((obj, i) => (
				<React.Fragment key={i}>
					<ListItem alignItems='flex-start'>
						<ListItemAvatar>
							<Avatar
								alt={obj.user.fullName}
								src={obj.user.avatarUrl}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={obj.user.fullName}
							secondary={obj.text}
						/>
					</ListItem>
					{i !== items.length - 1 && (
						<Divider
							variant='inset'
							component='li'
						/>
					)}
				</React.Fragment>
			))}
		</List>
	);
};
