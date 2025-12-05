import { MongoMemoryServer } from 'mongodb-memory-server';

async function startLocalDB() {
    console.log('🔄 Starting local MongoDB instance...');

    const mongod = await MongoMemoryServer.create({
        instance: {
            dbName: 'glabank',
            port: 27017,
            storageEngine: 'wiredTiger',
        },
        binary: {
            version: '7.0.0',
        },
    });

    const uri = mongod.getUri();

    console.log('✅ Local MongoDB instance started successfully!');
    console.log('📍 Connection URI:', uri);
    console.log('🗄️  Database Name: glabank');
    console.log('\n💡 Update your server/.env file with:');
    console.log(`   MONGODB_URI="${uri}glabank"`);
    console.log('\n⚠️  Keep this terminal open to keep the database running.');
    console.log('   Press Ctrl+C to stop the database.\n');

    // Keep the process running
    process.on('SIGINT', async () => {
        console.log('\n🛑 Stopping local MongoDB instance...');
        await mongod.stop();
        console.log('✅ Local MongoDB instance stopped.');
        process.exit(0);
    });
}

startLocalDB().catch(console.error);
