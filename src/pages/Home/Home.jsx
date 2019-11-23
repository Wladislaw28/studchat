import React from 'react';

import { Message } from 'components';
import './Home.scss';

const Home = () => (
    <section className='home'>
        <Message
            avatar='https://sun9-55.userapi.com/c850428/v850428459/8d1f9/9cZ1YRjKx3Y.jpg?ava=1'
            text='Calam,Brut! How are you ?'
            date='Tue Nov 22 2019 13:00:50 GMT+0300' />
        <Message
            avatar='https://sun9-55.userapi.com/c850428/v850428459/8d1f9/9cZ1YRjKx3Y.jpg?ava=1'
            text='Hi! I feel good'
            date='Tue Nov 23 2019 12:05:50 GMT+0300'
            isMe={true}
            isReaded={true} />
        <Message
            avatar='https://sun9-55.userapi.com/c850428/v850428459/8d1f9/9cZ1YRjKx3Y.jpg?ava=1'
            text='What are you doing?'
            date='Tue Nov 23 2019 17:50:50 GMT+0300'
            isMe={true}
            isReaded={false} />
    </section>
);

export default Home;