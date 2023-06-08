import { AppBar, Paper, Typography, Toolbar } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { UserTable } from './user-table';
import { GenOptions } from './GenOptions';
import { MenuPopup } from './MenuPopup';

export function MainView() {
  return (
    <Paper className="min-h-screen">
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight="bold"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Fake data generator
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="p-10">
        <UserTable />
      </div>
      <MenuPopup title="Options" icon={<Settings />}>
        <GenOptions />
      </MenuPopup>
    </Paper>
  );
}
