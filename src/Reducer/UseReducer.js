const intialState = {
    value:'',
    error:false,
    loading:false,
    deleted:false,
    confirmed:false
};

// const reducer = (state, action) => {

// }
//-------Primera forma de crear un reducer
// const reducer = (state, action) => {
//     if(action.type === 'ERROR')
//     {
//         return {
//             ...state,
//             error:true,
//             loading:false
//         };
//     }
//     else if(action.type === 'CHECK')
//     {
//         return {
//             ...state,
//             loading:true
//         };
//     }
//     else
//     {
//         return {
//             ...intialState
//         };
//     }
// }
//-------Segunda forma de crear un reducer
// const reducer = (state, action) => {
//     switch (action.type) 
//     {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error:true,
//                 loading:false
//             };
//         case 'CHECK':
//             return {
//                 ...state,
//                 error:true,
//                 loading:false
//             };   
    
//         default:
//             return {
//                 ...state
//             };
//     }
// }
//-------tercera forma de crear un reducer
const reducerObject = (state) => ({
    'ERROR':{
     ...state,
    error:true,
    loading:false
    },
    'CHECK':{
        ...state,
       loading:false
       },
});

const reducer = (state, action) => {
    
    if(reducerObject(state)[action.type])
    {
        return reducerObject(state)[action.type];
    }
    else
    {
        return state;
    }
}