import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

interface ReactotronConfig {
    host: string;
    port: number;
    name: string;
}
const options: ReactotronConfig = {
    host: '192.168.1.81', // localhost
    port: 9090,
    name: 'Bazzinga',
};

const ReactotronRef = Reactotron.configure(options)
    .useReactNative()
    .use(reactotronRedux());

if (__DEV__) {
    ReactotronRef.connect();
    console.tron = ReactotronRef;
} else {
    console.tron = {
        warn(): void {},
        log: () => {},
        error: () => {},
    };
}

export default ReactotronRef;
