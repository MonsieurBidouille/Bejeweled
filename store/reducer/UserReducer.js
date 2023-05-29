const initialState = {users:[],crnt_usr:"",user_an:0};

function UserReducer(state=initialState,action){
    let nextState;
    switch(action.type){
        case'add_user':
            nextState = {...state,
            users: [...state.users, action.value]
        };
        return nextState;
        
        case'crnt_user':
            nextState = {...state,
            crnt_usr:action.value 
        };
        return nextState;

        case'user_an':
            nextState = {...state,
            user_an:action.value 
        };

        default:
             return state;


        

    }
}

export default UserReducer;