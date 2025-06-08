import mongoose from 'mongoose';
import { persons, users } from './data';
import Person from './models/Person';
import User from './models/User';
const link = "mongodb://localhost:27017/purnata-db";

async function main() {
    await mongoose.connect(link);
    await Person.insertMany(persons);
    await User.insertMany(users);
    console.log('Data inserted successfully');
    mongoose.connection.close();
}

main().catch(err => console.error(err));