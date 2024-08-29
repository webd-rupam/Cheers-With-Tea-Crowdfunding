import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import connectDB from '@/db/connectDb';
import User from '@/app/models/User';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: 'read:user user:email' } }, // Request email access
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB(); // Ensure database connection

      let email = profile.email || user.email;

      if (!email && account.provider === 'github') {
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Authorization: `token ${account.access_token}`,
            },
          });
          const emails = await res.json();
          if (emails && emails.length > 0) {
            email = emails.find(e => e.primary)?.email || emails[0].email;
          }
        } catch (error) {
          console.error("Error fetching email from GitHub:", error);
          return false; // Prevent sign-in if fetching email fails
        }
      }

      if (!email) {
        console.error("Email is undefined after all attempts");
        return false; // Return false to prevent sign-in
      }

      const currentUser = await User.findOne({ email });
      if (!currentUser) {
        const newUser = new User({
          email,
          username: email.split("@")[0],
        });
        await newUser.save();
        console.log("New user created:", newUser);
      }
      return true;
    },
    async session({ session }) {
      if (!session.user.email) {
        console.error("Session email is undefined");
        return session; // Return the session as is
      }

      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
