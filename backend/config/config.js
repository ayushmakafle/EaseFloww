import { connect } from 'mongoose';
import 'colors'; //for console

const connectDb = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`mongodb connected ${conn.connection.host}`.yellow);
    } catch (error) {
        console.error(`Error: ${error}`.red);
        process.exit(1);
    }
}

export default connectDb;
