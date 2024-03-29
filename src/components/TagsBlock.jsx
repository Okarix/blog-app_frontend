import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SideBlock } from './SideBlock/SideBlock';
import { Link } from 'react-router-dom';

export const TagsBlock = ({ items, isLoading = true }) => {
	return (
		<SideBlock title='Тэги'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<Link
						style={{ textDecoration: 'none', color: 'black' }}
						to={`/posts/byTag/${name}`}
						key={i}
					>
						<ListItem
							key={i}
							disablePadding
						>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText
										onClick={() => onClickTag(name)}
										primary={name}
									/>
								)}
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</SideBlock>
	);
};
