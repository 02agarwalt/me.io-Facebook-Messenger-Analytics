// export const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) {
//             return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (err) {
//         return undefined;
//     }
// }



export class StateLoader {
    loadState() {
        try {
            let serializedState = localStorage.getItem("http://me.io:state");

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        } catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("http://me.io:state", serializedState);
        } catch (err) {

        }
    }

    initializeState() {
        return undefined;
        // return {
        //       //state object
        //     }
        // };
    }
}
