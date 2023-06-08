import {
  Input,
  Slider,
  Button,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { Casino } from '@mui/icons-material';
import { useState } from 'react';
import { debounce } from 'lodash';

import { usersDataStore as store } from '@/stores';
import { Locales } from '@/model';

const debouncedSeed = debounce((_seed: string) => store.setSeed(_seed), 200);

const debouncedMistakes = debounce((_count: number) => {
  store.setMistakesCount(_count);
}, 200);

export const GenOptions = observer(() => {
  const [locale, setLocale] = useState(store.locale);
  const [count, setCount] = useState(store.mistakesCount);
  const [seed, setSeed] = useState(store.seed ?? '');

  function handleCount(_count: number) {
    setCount(_count);
    debouncedMistakes(_count);
  }

  function handleSeed(_seed: string) {
    setSeed(_seed);
    debouncedSeed(_seed);
  }

  return (
    <div className="p-10 pt-5 flex flex-col max-w-sm gap-4">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Typography>Locale: </Typography>
        </Grid>
        <Grid item xs="auto">
          <FormControl fullWidth>
            <InputLabel id="locale-label">Locale</InputLabel>
            <Select
              labelId="locale-label"
              value={locale}
              label="Locale"
              onChange={({ target: { value } }) => {
                const loc = value as Locales;
                setLocale(loc);
                store.setLocale(loc);
              }}
            >
              <MenuItem value={Locales.EN}>English</MenuItem>
              <MenuItem value={Locales.RU}>Russian</MenuItem>
              <MenuItem value={Locales.DE}>German</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Mistake count:</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={count}
            min={0}
            max={10}
            valueLabelDisplay="auto"
            step={0.25}
            onChange={(_, value) => {
              if (!Array.isArray(value)) handleCount(value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            value={count}
            size="small"
            onChange={({ target: { value } }) => {
              if (!isNaN(+value)) handleCount(+value);
            }}
            inputProps={{
              type: 'number',
              max: 1000,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Seed:</Typography>
        </Grid>
        <Grid item xs>
          <Input
            value={seed}
            size="small"
            onChange={({ target: { value } }) => {
              handleSeed(value);
            }}
            inputProps={{
              type: 'text',
            }}
          />
        </Grid>
        <Grid item xs="auto" alignContent="center">
          <Button
            variant="contained"
            title="Random"
            size="small"
            startIcon={<Casino />}
            color="primary"
            onClick={() => {
              setSeed('');
              store.setSeed();
            }}
          >
            Random
          </Button>
        </Grid>
      </Grid>
    </div>
  );
});
