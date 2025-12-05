import User from '../models/User.model.js';

export const ensureAdminExists = async () => {
    try {
        const adminEmail = 'admin@glabank.com';
        let admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            admin = new User({
                email: adminEmail,
                password: 'admin123',
                name: 'Admin User',
                role: 'admin'
            });
            await admin.save();
            console.log('✅ Created admin user:', adminEmail);
        } else {
            console.log('ℹ️  Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error ensuring admin exists:', error);
    }
};
