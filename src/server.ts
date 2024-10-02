import app from './app';
import config from './config';

const server = app.listen(config.PORT);

(() => {
  try {
    // console.info('APPLICATION_STARTED', {
    //   meta: {
    //     port: config.PORT,
    //     server: config.SERVER_URL
    //   }
    // });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error('APPLICATION_ERROR', { meta: error });

    server.close((err) => {
      if (err) {
        // console.error('APPLICATION_ERROR', { meta: err });
      }
      process.exit(1);
    });
  }
})();
