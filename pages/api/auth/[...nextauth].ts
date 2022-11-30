import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        console.log('dis account', account)
        token.uid = user?.id
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // @ts-ignore
      session.accesToken = token.accesToken
      // @ts-ignore
      session.user.id = token.uid
      return session
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
})
