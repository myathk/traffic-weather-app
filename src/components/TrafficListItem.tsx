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
      <ListItemButton divider onClick={props.handleClick} selected={props.selected}>
        <ListItemText primary={props.primaryText} secondary={props.secondaryText}></ListItemText>
      </ListItemButton>
    </>
  );
};
