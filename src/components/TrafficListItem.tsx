import { ListItemButton, ListItemText } from '@mui/material';
interface IListItem {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  primaryText: string;
  secondaryText: string;
  selected: boolean;
}

export const TrafficListItem = (props: IListItem) => {
  return (
    <>
      <ListItemButton
        divider
        onClick={props.handleClick}
        selected={props.selected}
        sx={{
          margin: '3px',
          border: 'ridge #8bd0da 3px',
          '&.Mui-selected': {
            background: '#aedfe5',
          },
        }}
      >
        <ListItemText primary={props.primaryText} secondary={props.secondaryText}></ListItemText>
      </ListItemButton>
    </>
  );
};
