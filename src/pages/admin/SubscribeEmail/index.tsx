import React from 'react';
import { useGetSubscribesQuery } from './SubscribeEmail.service';

const SubscribeEmail = () => {
    const { data: SubscribeResponse, isFetching: isFetchingSubscribe } = useGetSubscribesQuery();
    console.log(SubscribeResponse?.subscribe, 'he');
    
    return (
        <div>
            sdfasdfsd
            <h1>tesst</h1>
        </div>
    );
};

export default SubscribeEmail;