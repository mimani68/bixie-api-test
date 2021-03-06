import { yellowBright } from 'chalk';
import { config       } from 'dotenv'

if ( process.env.NODE_ENV === 'local' ) {
  config()
}

import { config as configObject } from './config'
import { app } from './startup/app';

const PORT = configObject.PORT

app.listen(PORT, () => {
  console.log(`
-----------------------------
        B  I  X  I  E
--| port: ${  yellowBright(PORT) } |------------
`)
});