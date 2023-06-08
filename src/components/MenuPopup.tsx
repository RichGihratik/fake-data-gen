import {
  Popover,
  Fab,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState, ReactNode } from 'react';

type Props = {
  title: string;
  icon: ReactNode;
  children?: ReactNode;
};

export function MenuPopup({ title, icon, children }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="fixed right-10 bottom-10">
        <Fab color="primary" onClick={() => setOpened(true)}>
          {icon}
        </Fab>
      </div>
      <Popover
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        open={opened}
        anchorEl={document.body}
        onClose={() => setOpened(false)}
        slotProps={{ paper: { square: false } }}
      >
        <div className="flex flex-col rounded-lg">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <IconButton onClick={() => setOpened(false)}>
              <Close />
            </IconButton>
          </Toolbar>
          <Divider />

          <div className="flex flex-col justify-center gap-5 flex-1">
            {children}
          </div>
        </div>
      </Popover>
    </>
  );
}
