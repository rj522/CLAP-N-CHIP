import { State, Action } from '@ngxs/store';

// actions 
export class Add {
  static readonly type = 'Add';
}

// state defination
@State<number>({
  name: 'count',
  defaults: 0
})

// epics and reducers
export class CountState {
  @Action(Add)
  add({ getState, setState }) {
    const state = getState();
    setState(state + 1);
  }
}


// All of the above sections can be their own files
// state defination can be a class in itself

// Pending questions
// 1. how to have segregated componentwise state, and add it to global state
// 2. where should our epics lie ?
// 3. how to segregate actions, according to componentwise state