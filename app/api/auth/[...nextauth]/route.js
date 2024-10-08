import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';


import User from "@/models/user";
import { COnnectToDB } from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    // this callback object should contain the two functions but then you will get an access denied 
    // callbacks: {

    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })
        session.user.id = session = sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }) {
        try {
            await COnnectToDB();

            const userExists = await User.findOne({
                email: profile.email
            });

            // if not then create one
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").
                        toLowerCase(),
                    image: profile.picture
                })
            }

        } catch (error) {
            console.log(error);
            return false;

        }

    }
    // }
})

export { handler as GET, handler as POST };

