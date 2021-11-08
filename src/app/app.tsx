import React from 'react';
import './styles.module.scss';
import Routing from "../routing";
// import {Provider} from "react-redux";
// import {store} from "../store";
// import {QueryClient, QueryClientProvider} from "react-query";

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             refetchOnWindowFocus: false,
//             cacheTime: 0,
//         },
//     },
// });

const App = () => {
    return (
        <Routing/>
        // <QueryClientProvider client={queryClient}>
        //     <Provider store={store}>*/}
        //         <Routing/>
        //     {/*</Provider>*/}
        // </QueryClientProvider>
    );
};

export default App;
