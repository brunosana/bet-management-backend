import mongoose from 'mongoose';

async function connect(): Promise<void> {
    const uri = `${process.env.MONGO_URL}`;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    await mongoose.connect(uri, options);
    console.log('Database Connected...');
}

function close(): void {
    mongoose.connection.close();
}

export { connect, close };
