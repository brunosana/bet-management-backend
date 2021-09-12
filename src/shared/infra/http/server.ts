import { connect } from '@shared/infra/database/mongodb';

import { app } from './app';

app.listen(process.env.PORT || 8080, async () => {
    await connect();
    console.log(`Server opened on port ${process.env.PORT || 8080}...`);
});
