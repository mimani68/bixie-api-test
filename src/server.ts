import { get } from 'config';
import { yellowBright } from 'chalk';
import { app } from './startup/app';

const PORT = process.env.PORT || get('App.port');

app.listen(PORT, () => {
  console.log(`
-----------------------------
         B  I  X  I  E
--| port: ${  yellowBright(PORT) } |--------------
`)
});