import firebaseAdmin from '@/utils/firebaseAdmin';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

interface IOpts {
    redirectIfNotAuth: boolean;
    redirectTo?: string;
}

const defaultOpts = { redirectIfNotAuth: true, redirectTo: '/login' };

const withAuthServerSideProps = (opts: IOpts = defaultOpts, getServerSidePropsFunc?: Function) => {
    return async (context: GetServerSidePropsContext) => {
        try {
            const cookies = nookies.get(context);
            console.log('PUKIO', cookies)
            const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
            const user = { uid: token.uid, email: token.email }

            if (getServerSidePropsFunc) {
                return {
                    props: {
                        user,
                        data: await getServerSidePropsFunc(context, user)
                    }
                };
            }

            return { props: { user } };

        } catch (e) {
            console.log('ERROR', e)

            if (opts.redirectIfNotAuth) {
                return {
                    props: {} as never,
                    redirect: {
                        destination: opts.redirectTo,
                        permanent: false
                    }
                }
            } else {
                return {
                    props: {} as never
                }
            }
        }
    }
}

export default withAuthServerSideProps;
