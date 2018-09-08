'use babel';

import kor2hanziProvider from './kor2hanzi-provider';

export default {
    getProvider() {
        // return a single provider, or an array of providers to use together
        return [kor2hanziProvider];
    }
};
