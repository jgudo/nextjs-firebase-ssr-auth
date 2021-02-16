import Router from 'next/router';

const withAuthComponent = (Component: any) => {
    return (props: any) => {
        if (!props.user) {
            return Router.push('/login');
        }
        return <Component {...props} />
    }
}

export default withAuthComponent;
