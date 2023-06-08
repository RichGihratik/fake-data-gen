import { AppBar, Paper, Typography, Toolbar, Button } from '@mui/material';
import { Settings, Save } from '@mui/icons-material';
import { UserTable } from './user-table';
import { GenOptions } from './GenOptions';
import { MenuPopup } from './MenuPopup';

import { usersDataStore as store } from '@/stores';

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
          <Button startIcon={<Save />} onClick={() => store.downloadData()}>
            Export to CSV
          </Button>
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
